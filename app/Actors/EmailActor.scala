package Actors

import akka.actor.{ActorLogging, Actor}
import play.api.libs.mailer.{Email, MailerClient}

/**
 * Created by carlos on 17/11/15.
 */
class EmailActor(mailer: MailerClient) extends Actor with ActorLogging{

  def SendEmails(email: Email): Unit ={
    log.info(s"Contact email sent-> ${email.to}")
    mailer.send(email)
  }

  def receive = {
    case email: Email => sender() ! SendEmails(email)
  }
}
