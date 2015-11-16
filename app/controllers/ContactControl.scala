package controllers

import javax.inject.{Inject, Named}

import akka.actor.ActorRef
import akka.pattern.ask
import akka.util.Timeout
import models.Contact
import models.Services.ContactService
import org.joda.time.DateTime
import play.api.Play.current
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}
import utils.Responses.{SuccessResponse, ErrorResponse}

import scala.concurrent.ExecutionContext.Implicits._
import scala.concurrent.Future
import scala.concurrent.duration._
import scala.util.{Failure, Success}

/**
 * Created by carlos on 14/11/15.
 */
class ContactControl @Inject()(@Named("email-actor") emailActor: ActorRef, contService: ContactService, val messagesApi: MessagesApi) extends Controller with I18nSupport {

  def sendContact = Action.async(parse.json) { implicit request =>
    val incomingContact = request.body.validate[Contact]
    incomingContact.fold({ error =>
      val response = ErrorResponse(BAD_REQUEST, messagesApi("request.error"))
      Future.successful(BadRequest(Json.toJson(response)))
    }, { data =>

      val timeoutKey = "DoceTentacaoSlick.timeouts.email_availability_ms"
      val configuredTimeout = current.configuration.getInt(timeoutKey)
      val resolvedTimeout = configuredTimeout.getOrElse(5)
      implicit val timeout = Timeout(resolvedTimeout.seconds)

      val emailFuture = emailActor ? data
      emailFuture.onComplete {
        case Success(value) => contService.addContact(data.copy(sent = Option(true), data = Option(new DateTime())))
        case Failure(e) => contService.addContact(data.copy(sent = Option(false), data = Option(new DateTime())))
      }
      Future.successful(Created(Json.toJson(SuccessResponse(messagesApi("email.send")))))
    })
  }
}

