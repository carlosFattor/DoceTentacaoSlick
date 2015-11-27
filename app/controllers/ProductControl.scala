package controllers

import java.util.UUID
import javax.inject.Inject

import models.Product
import models.Services.ProductService
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}
import security.Authenticated
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

  def getList(id: UUID) = Action.async { implicit request =>
    prodService.findByIdCategory(id).map{
      case prods: Seq[models.Product] => Ok(Json.toJson(SuccessResponse(prods)))
      case _ => BadRequest(Json.toJson(ErrorResponse(BAD_REQUEST, messagesApi("prod.fail.prod"))))
    }
  }

  def getListByName(name: String) = Action.async { implicit request =>
    println(name)
    prodService.findProductByName(name).map {
      case prods: Seq[models.Product] => Ok(Json.toJson(SuccessResponse(prods)))
      case _ => BadRequest(Json.toJson(ErrorResponse(BAD_REQUEST, messagesApi("prod.fail.prod"))))
    }
  }

  def get(id: UUID) = Action.async { implicit request =>
    prodService.findProduct(id).map {
      case Some(prod) => Ok(Json.toJson(SuccessResponse(prod)))
      case None => NotFound(Json.toJson(ErrorResponse(NOT_FOUND, messagesApi("prod.not_found"))))
    }
  }

  def add = Authenticated.async(parse.json) { implicit request =>
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

  def edit(id: UUID) = Authenticated.async { implicit request =>
    prodService.findProduct(id).map {
      case Some(prod) => Ok(Json.toJson(SuccessResponse(prod)))
      case None => NotFound(Json.toJson(ErrorResponse(NOT_FOUND, messagesApi("prod.not_found"))))
    }
  }

  def update = Authenticated.async { implicit request =>
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

  def delete = Authenticated.async(parse.tolerantText) { request =>
    val id = request.body

    prodService.removeProduct(java.util.UUID.fromString(id)).map { resp =>
      if (resp == 1) {
        Ok(Json.toJson(SuccessResponse(resp)))
      } else {
        BadRequest(Json.toJson(ErrorResponse(BAD_REQUEST, messagesApi("prod.not.found"))))
      }
    }
  }
}
