package controllers

import java.util.UUID
import javax.inject.Inject
import forms.SignInForm
import models.Services.UserService
import models.User
import play.api.i18n.{MessagesApi, I18nSupport}
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}
import security.Authenticated
import utils.Responses.{ErrorResponse, SuccessResponse}
import scala.concurrent.ExecutionContext.Implicits._
import scala.concurrent.Future

/**
 * Created by carlos on 16/10/15.
 */
class UserControl @Inject()(userService: UserService, val messagesApi: MessagesApi) extends Controller with I18nSupport {

  def login = Action.async(parse.json) { implicit request =>
    val incomingSign = request.body.validate[SignInForm]

    incomingSign.fold( { error =>
      val response = ErrorResponse(BAD_REQUEST, messagesApi("request.error"))
      Future.successful(BadRequest(Json.toJson(response)))
    }, { sign =>
      userService.validateUser(sign.email, sign.password).flatMap {
        case Some(user) => {
          Future.successful(Ok(Json.toJson(SuccessResponse(user))).withSession("email" -> user.email))
        }
        case None => {
          Future.successful(NotFound(Json.toJson(ErrorResponse(NOT_FOUND, messagesApi("user.not.found")))))
        }
      }
    })
  }

  def logout = Action {
    Ok("").withNewSession
  }

  def add = Authenticated.async { implicit request =>
    val incomingUser = User.formUser.bindFromRequest()

    incomingUser.fold(error => {
      val response = ErrorResponse(BAD_REQUEST, messagesApi("request.error"))
      Future.successful(BadRequest(Json.toJson(response)))
    }, { newUser =>
      userService.addUser(newUser).flatMap {
        case Some(user) => Future.successful(Ok(Json.toJson(SuccessResponse(user))))
        case None => Future.successful(BadRequest(Json.toJson(ErrorResponse(NOT_FOUND, messagesApi("user.not.save")))))
      }
    })
  }

  def users = Authenticated.async { implicit request =>
    val usersFuture = userService.findListUser()

    usersFuture.map {
      case users: Seq[User] =>Ok(Json.toJson(SuccessResponse(users)))
      case _ => NotFound(Json.toJson(ErrorResponse(NOT_FOUND, messagesApi("user.not.found"))))
    }
  }

  def edit(userID: UUID) = Authenticated.async { implicit request =>
    userService.findUser(userID).map {
      case Some(user) => Ok(Json.toJson(SuccessResponse(user)))
      case None => NotFound(Json.toJson(ErrorResponse(NOT_FOUND, messagesApi("user.not.found"))))
    }
  }

  def update = Authenticated.async { implicit request =>
    val incomingUser = User.formUser.bindFromRequest()

    incomingUser.fold(error => {
      val response = ErrorResponse(BAD_REQUEST, messagesApi("request.error"))
      Future.successful(BadRequest(Json.toJson(response)))
    }, { newUser =>
      userService.updateUSer(newUser).map { resp =>
        if (resp > 0) {
          Ok(Json.toJson(SuccessResponse(resp)))
        } else {
          BadRequest(Json.toJson(resp))
        }
      }
    })
  }

  def delete(id: UUID) = Authenticated.async { request =>

    userService.deleteUser(id).map{ resp =>
      if(resp == 1){
        Ok(Json.toJson(SuccessResponse(resp)))
      } else {
        BadRequest(Json.toJson(ErrorResponse(BAD_REQUEST, messagesApi("user.not.found"))))
      }
    }
  }
}
