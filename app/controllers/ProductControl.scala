package controllers

import java.util.UUID
import javax.inject.Inject

import models.Product
import models.Services.ProductService
import play.api.i18n.{MessagesApi, I18nSupport}
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}
import utils.Responses.{ErrorResponse, SuccessResponse}
import scala.concurrent.ExecutionContext.Implicits._
import scala.concurrent.Future

/**
 * Created by carlos on 22/10/15.
 */
class ProductControl @Inject()(prodService: ProductService, val messagesApi: MessagesApi) extends Controller with I18nSupport {

  def list = Action.async { implicit request =>
    prodService.findListProduct().map {
      case prods: Seq[models.Product] => Ok(Json.toJson(SuccessResponse(prods)))
      case _ => BadRequest(Json.toJson(ErrorResponse(BAD_REQUEST, messagesApi("prod.fail.prod"))))
    }
  }

  def listFeatured = Action.async { implicit request =>
    prodService.findListProductFeatured().map {
      case prods: Seq[models.Product] => Ok(Json.toJson(SuccessResponse(prods)))
      case _ => BadRequest(Json.toJson(ErrorResponse(BAD_REQUEST, messagesApi("prod.fail.prod"))))
    }
  }

  def add = Action.async(parse.json) { implicit request =>
    val incomingProd = Product.formProduct.bindFromRequest()

    incomingProd.fold({ error =>
      val response = ErrorResponse(BAD_REQUEST, messagesApi("prod.form.error"))
      Future.successful(BadRequest(Json.toJson(response)))
    }, { prod =>
      prodService.addProduct(prod).map {
        case Some(prod) => Created(Json.toJson(SuccessResponse(prod)))
        case None => BadRequest(Json.toJson(ErrorResponse(BAD_REQUEST, messagesApi("prod.add.fail"))))
      }
    })
  }

  def edit(id: UUID) = Action.async { implicit request =>
    prodService.findProduct(id).map {
      case Some(prod) => Ok(Json.toJson(SuccessResponse(prod)))
      case None => NotFound(Json.toJson(ErrorResponse(NOT_FOUND, messagesApi("prod.not_found"))))
    }
  }

  def update = Action.async { implicit request =>
    val incomingProd = Product.formProduct.bindFromRequest

    incomingProd.fold({ error =>
      val response = ErrorResponse(BAD_REQUEST, messagesApi("prod.up.fail"))
      Future.successful(BadRequest(Json.toJson(response)))
    }, { prod =>
      prodService.updateProduct(prod).map { resp =>
        if (resp == 1) {
          Created(Json.toJson(SuccessResponse(resp)))
        } else {
          BadRequest(Json.toJson(ErrorResponse(BAD_REQUEST, messagesApi("prod.not.found"))))
        }
      }
    })
  }

  def delete(id: UUID) = Action.async { implicit request =>
    prodService.removeProduct(id).map { resp =>
      if (resp == 1) {
        Ok(Json.toJson(SuccessResponse(resp)))
      } else {
        BadRequest(Json.toJson(ErrorResponse(BAD_REQUEST, messagesApi("prod.not.found"))))
      }
    }
  }
}
