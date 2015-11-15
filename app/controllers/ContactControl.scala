package controllers

import javax.inject.Inject
import models.Contact
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}
import utils.Responses.ErrorResponse

import scala.concurrent.Future

/**
 * Created by carlos on 14/11/15.
 */
class ContactControl @Inject()(val messagesApi: MessagesApi) extends Controller with I18nSupport{

  def sendContact = Action.async(parse.json) { implicit request =>
    val incomingContact = request.body.validate[Contact]
    incomingContact.fold({ error =>
      val response = ErrorResponse(BAD_REQUEST, messagesApi("request.error"))
      Future.successful(BadRequest(Json.toJson(response)))
    }, { data =>
      println(data)
      Future.successful(Ok(messagesApi("email.send")))
    })
  }

}
