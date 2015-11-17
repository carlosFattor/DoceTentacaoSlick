package controllers

import java.util.UUID
import javax.inject.Inject
import models.Category
import models.Services.CategoryService
import play.api.cache.Cached
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}
import utils.Responses.{SuccessResponse, ErrorResponse}
import scala.concurrent.ExecutionContext.Implicits._
import scala.concurrent.Future

/**
 * Created by carlos on 17/10/15.
 */
class CategoryControl @Inject()(categoryService: CategoryService, val messagesApi: MessagesApi, cached: Cached) extends Controller with I18nSupport {

  def list = Action.async { implicit request =>

    categoryService.list.map {
      case cats:Seq[models.Category] => Ok(Json.toJson(SuccessResponse(cats)))
      case _ => NotFound(Json.toJson(ErrorResponse(NOT_FOUND, messagesApi("cat.not.save"))))
    }
  }

  def add = Action.async(parse.json) { implicit request =>

    val incomingCategory = Category.formCategory.bindFromRequest()

    incomingCategory.fold({ error =>
      val response = ErrorResponse(BAD_REQUEST, messagesApi("request.error"))
      Future.successful(BadRequest(Json.toJson(response)))
    }, { category =>
      categoryService.add(category).map {
        case Some(cat) => Created(Json.toJson(SuccessResponse(cat)))
        case None => BadRequest(Json.toJson(ErrorResponse(BAD_REQUEST, messagesApi("cat.not.found"))))
      }
    })
  }

  def edit(id: UUID) = Action.async { implicit request =>
    categoryService.findByID(id).map{
      case Some(cat) => Ok(Json.toJson(SuccessResponse(cat)))
      case None => NotFound(Json.toJson(ErrorResponse(BAD_REQUEST, messagesApi("cat.not.found"))))
    }
  }

  def update = Action.async { implicit request =>

    val incomingCategory = Category.formCategory.bindFromRequest()

    incomingCategory.fold({ error =>
      val response = ErrorResponse(BAD_REQUEST, messagesApi("request.error"))
      Future.successful(BadRequest(Json.toJson(response)))
    }, { category =>
      categoryService.update(category).map { resp =>
        if(resp == 1){
          Created(Json.toJson(SuccessResponse(resp)))
        } else {
          BadRequest(Json.toJson(ErrorResponse(BAD_REQUEST, messagesApi("cat.not.found"))))
        }
      }
    })
  }

  def delete(id: UUID) = Action.async { implicit request =>

    categoryService.delete(id).map{ resp =>
      if (resp == 1) {
        Ok(Json.toJson(SuccessResponse(resp)))
      } else {
        BadRequest(Json.toJson(ErrorResponse(BAD_REQUEST, messagesApi("cat.not.found"))))
      }
    }
  }
}
