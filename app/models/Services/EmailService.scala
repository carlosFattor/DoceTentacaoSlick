package models.Services

import javax.inject.{Inject, Named}

import akka.actor.ActorRef
import akka.pattern.ask
import akka.util.Timeout
import models.Contact
import play.api.Play._

import scala.concurrent.Future
import scala.concurrent.duration._

/**
 * Created by carlos on 17/11/15.
 */
class EmailService @Inject()(@Named("emailWork") emailActor: ActorRef){


  def sendEmailContact(contact: Contact): Future[Boolean] ={

    val timeoutKey = "DoceTentacaoSlick.timeouts.email_availability_ms"
    val configuredTimeout = current.configuration.getInt(timeoutKey)
    val resolvedTimeout = configuredTimeout.getOrElse(5)
    implicit val timeout = Timeout(resolvedTimeout.seconds)
    emailActor ? contact
    Future.successful(true)
  }

}
