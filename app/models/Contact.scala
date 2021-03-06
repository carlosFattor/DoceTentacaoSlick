package models

import java.util.UUID

import models.DAOs.GenericTable
import org.joda.time.DateTime
import play.api.Play
import play.api.Play._
import play.api.data.Form
import play.api.db.slick.DatabaseConfigProvider
import play.api.libs.json.{Json, Format}
import play.api.libs.mailer.Email
import utils.SlickMapping.jodaDateTimeMapping
import slick.driver.JdbcProfile

/**
 * Created by carlos on 14/10/15.
 */
case class Contact(id: Option[UUID],
                   name: String,
                   email: String,
                   phone: Option[String] = Option(""),
                   website: Option[String] = Option(""),
                   textEmail: String,
                   data: Option[DateTime] = Option(new DateTime()),
                   sent: Option[Boolean] = Option(false)) {

  //second constructor
  def this(email: String) {
    this(Option(java.util.UUID.randomUUID()), "Email - News Letter", email, Option(""), Option(""), "News Letter", Option(new DateTime()), Option(true))
  }

  def generateEmailContact(subject: String): Seq[Email] = {
    val emailToContact = Email(
      subject,
      "Nilda Doce Tentação " + current.configuration.getString("play.email.admin").getOrElse(""),
      Seq(email),
      bodyText = Some(textEmail),
      bodyHtml = Some(views.html.emails.email_contact(this).toString()))

    val email2Contact = Email(
      subject,
      "Nilda Doce Tentação " + current.configuration.getString("play.email.admin").getOrElse(""),
      Seq(current.configuration.getString("play.email.admin").getOrElse("")),
      bodyText = Some(textEmail),
      bodyHtml = Some(views.html.emails.email_contact(this).toString()))

    Seq(emailToContact, email2Contact)
  }

}

object Contact {

  import play.api.data.Forms._

  implicit val format: Format[Contact] = Json.format[Contact]



  val formContact = Form(
    mapping(
      "id" -> optional(uuid),
      "name" -> nonEmptyText,
      "email" -> email,
      "phone" -> optional(text),
      "website" -> optional(text),
      "textEmail" -> nonEmptyText,
      "data" -> optional(jodaDate),
      "sent" -> optional(boolean)
    )(Contact.apply)(Contact.unapply))

  protected val dbConfig = DatabaseConfigProvider.get[JdbcProfile](Play.current)

  import dbConfig.driver.api._

  class ContactTable(tag: Tag) extends GenericTable[Contact](tag, "contact") {
    override def id = column[UUID]("id", O.PrimaryKey, O.AutoInc)

    def name = column[String]("name")

    def email = column[String]("email")

    def phone = column[String]("phone")

    def website = column[String]("web_site")

    def textEmail = column[String]("text_email")

    def data = column[DateTime]("data")

    def sent = column[Boolean]("sent")

    def * = (id.?, name, email, phone.?, website.?, textEmail, data.?, sent.?) <>((Contact.apply _).tupled, Contact.unapply)
  }

  val table = TableQuery[ContactTable]
}