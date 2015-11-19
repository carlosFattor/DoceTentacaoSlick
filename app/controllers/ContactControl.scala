package controllers

import javax.inject.Inject

import models.Contact
import models.Services.{ContactService, EmailService}
import org.joda.time.DateTime
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}
import utils.Responses.{ErrorResponse, SuccessResponse}

import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Failure, Success}


/**
 * Created by carlos on 14/11/15.
 */
class ContactControl @Inject()(emailService: EmailService, contService: ContactService, val messagesApi: MessagesApi)(implicit ec: ExecutionContext) extends Controller with I18nSupport {

  val Email = """([\w\.]+)@([\w\.]+)""".r

  def sendContact = Action.async(parse.json) { implicit request =>
    val incomingContact = request.body.validate[Contact]
    incomingContact.fold({ error =>
      val response = ErrorResponse(BAD_REQUEST, messagesApi("request.error"))
      Future.successful(BadRequest(Json.toJson(response)))

    }, { data =>

      emailService.sendEmailContact(data).onComplete {
        case Success(value) => contService.addContact(data.copy(sent = Option(value), data = Option(new DateTime())))
        case Failure(e) => contService.addContact(data.copy(sent = Option(false), data = Option(new DateTime())))
      }

      Future.successful(Created(Json.toJson(SuccessResponse(messagesApi("email.send")))))
    })
  }

  def news = Action(parse.json) { implicit request =>
    val email = request.body

    Email.findFirstIn((email \ "email").as[String]) match {
      case Some(a) => {
        contService.addContact(new Contact(a))
        Created(Json.toJson(SuccessResponse(messagesApi("email.news.created"))))
      }
      case None    => {
        println(email)
        BadRequest(Json.toJson(ErrorResponse(BAD_REQUEST, messagesApi("email.news.error"))))
      }
    }
  }
}

