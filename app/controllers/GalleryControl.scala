package controllers

import java.util.UUID
import javax.inject.Inject

import models.Gallery
import models.Services.GalleryService
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}
import utils.Responses.{ErrorResponse, SuccessResponse}
import scala.concurrent.ExecutionContext.Implicits._
import scala.concurrent.Future


/**
 * Created by carlos on 23/10/15.
 */
class GalleryControl @Inject()(galService: GalleryService, val messagesApi: MessagesApi) extends Controller with I18nSupport{


  def list = Action.async { implicit request =>
    galService.findListGallery.map{
      case galls:Seq[Gallery] => Ok(Json.toJson(SuccessResponse(galls)))
      case _ => BadRequest(Json.toJson(ErrorResponse(BAD_REQUEST, messagesApi("gal.find.nok"))))
    }
  }

  def add = Action.async(parse.json) { implicit request =>
    val incomingGal = Gallery.formGallery.bindFromRequest

    incomingGal.fold({ error =>
      Future.successful(BadRequest(Json.toJson(ErrorResponse(BAD_REQUEST, messagesApi("gal.add.error")))))
    }, { galF =>
      galService.addGallery(galF).map {
        case Some(gal) => Created(Json.toJson(SuccessResponse(gal)))
        case None => BadRequest(Json.toJson(ErrorResponse(BAD_REQUEST, messagesApi("gal.add.fail"))))
      }
    })
  }

  def edit(id: UUID) = Action.async { implicit request =>
    galService.findGallery(id).map {
      case Some(gal) => Ok(Json.toJson(SuccessResponse(gal)))
      case None => BadRequest(Json.toJson(ErrorResponse(BAD_REQUEST, messagesApi("gal.find.error"))))
    }
  }

  def update = Action.async { implicit request =>
    val incomingGal = Gallery.formGallery.bindFromRequest

    incomingGal.fold({ error =>
      Future.successful(BadRequest(Json.toJson(ErrorResponse(BAD_REQUEST, messagesApi("gal.add.error")))))
    }, { galF =>
      galService.updateGallery(galF).map { resp =>
        if(resp == 1){
          Ok(Json.toJson(SuccessResponse(resp)))
        } else {
          BadRequest(Json.toJson(ErrorResponse(BAD_REQUEST, messagesApi("gal.add.fail"))))
        }
      }
    })
  }

  def delete = Action.async(parse.tolerantText) { implicit request =>
    val id = request.body
      galService.removeGallery(UUID.fromString(id)).map { resp =>
      if(resp == 1){
        Ok(Json.toJson(SuccessResponse(resp)))
      } else {
        BadRequest(Json.toJson(ErrorResponse(BAD_REQUEST, messagesApi("gal.del.error"))))
      }
    }
  }
}
