package controllers

import javax.inject.Inject

import forms.SignInForm
import models.Services.UserService
import models.User
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}
import utils.Responses.{ErrorResponse, SuccessResponse}

import scala.concurrent.ExecutionContext.Implicits._
import scala.concurrent.Future

/**
 * Created by carlos on 16/10/15.
 */
class UserControl @Inject()(userService: UserService) extends Controller {

  def login = Action.async(parse.json) { implicit request =>
    val incomingSign = request.body.validate[SignInForm]

    incomingSign.fold(error => {
      val errorMsg = s"error value from request"
      val response = ErrorResponse(ErrorResponse.INVALID_JSON, errorMsg)
      Future.successful(BadRequest(Json.toJson(response)))
    }, { sign =>
      userService.validateUser(sign.email, sign.password).flatMap {
        case Some(user) => {
          Future.successful(Ok(Json.toJson(SuccessResponse(user))).withSession("email" -> user.email))
        }
        case None => {
          Future.successful(NotFound(Json.toJson(ErrorResponse(NOT_FOUND, "No user found"))))
        }
      }
    })
  }

  def logout = Action {
    Ok("").withNewSession
  }

  def add = Action.async(parse.json) { implicit request =>
    val incomingUser = request.body.validate[User]

    incomingUser.fold(error => {
      val errorMsg = s"error value from request"
      val response = ErrorResponse(ErrorResponse.INVALID_JSON, errorMsg)
      Future.successful(BadRequest(Json.toJson(response)))
    }, { newUser =>
      userService.addUser(newUser).flatMap {
        case Some(user) => Future.successful(Ok(Json.toJson(SuccessResponse(user))))
        case None => Future.successful(NotFound(Json.toJson(ErrorResponse(NOT_FOUND, "Error on try save USer"))))
      }
    })
  }

  def users = Action.async { implicit request =>
    val usersFuture = userService.findListUser()

    usersFuture.map{ users =>
      Ok(Json.toJson(SuccessResponse(users)))
    }
  }
}
