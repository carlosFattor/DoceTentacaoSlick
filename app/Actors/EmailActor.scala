package Actors

import akka.actor.{Props, Actor}
import javax.inject.Inject
import models.Contact
import play.api.i18n.{MessagesApi, I18nSupport}
import play.api.libs.concurrent.Akka
import play.api.libs.mailer._

/**
 * Created by carlos on 15/11/15.
 */
class EmailActor @Inject()(mailer: MailerClient, val messagesApi: MessagesApi) extends Actor with I18nSupport {

  private val emailAdmin = "<nilda.docetentacao@gmail.com>"

  private def sendEmailContact(contact: Contact): Unit = {
    val emailToContact = Email(
      messagesApi("email.subject"),
      "Nilda Doce Tentação " + emailAdmin,
      Seq(contact.email),
      bodyText = Some(contact.textEmail),
      bodyHtml = Some(views.html.emails.email_contact(contact).toString())
    )
    mailer.send(emailToContact)
  }

  private def sendEmailAdmin(contact: Contact) {
    val email2Contact = Email(
      messagesApi("email.subject"),
      "Nilda Doce Tentação " + emailAdmin,
      Seq("carlos.fattor@gmail.com", emailAdmin),
      bodyText = Some(contact.textEmail),
      bodyHtml = Some(views.html.emails.email_contact(contact).toString()))
    mailer.send(email2Contact)
  }

  def sendEmailContactAdmin(contact: Contact): Unit = {
    sendEmailContact(contact)
    sendEmailAdmin(contact)
    sender() ! true
  }

  def receive = {
    case email: Contact => sendEmailContactAdmin(email)
  }
}

object EmailActor {
  import play.api.Play.current

  def props = Props[EmailActor]

  private val reference = Akka.system.actorOf(EmailActor.props, name = "email-actor")

  def getSelection = Akka.system.actorSelection("email-actor")
}