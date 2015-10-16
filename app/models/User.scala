package models

import java.util.UUID

import models.DAOs.GenericTable
import play.api.Play
import play.api.db.slick.DatabaseConfigProvider
import play.api.libs.json.{Format, Json}
import slick.driver.JdbcProfile

/**
 * Created by carlos on 14/10/15.
 */
case class User(id: Option[UUID],
                name: String,
                email: String,
                password: String,
                avatarURL: String,
                desc: String = "")

object User {
  implicit val form: Format[User] = Json.format[User]

  protected val dbConfig = DatabaseConfigProvider.get[JdbcProfile](Play.current)
  import dbConfig.driver.api._

  class UserTable(tag: Tag) extends GenericTable[User](tag, "user") {
    override def id = column[UUID]("id", O.PrimaryKey, O.AutoInc)
    def name = column[String]("name")
    def email = column[String]("email")
    def password = column[String]("password")
    def avatarURL = column[String]("avatar_url")
    def desc = column[String]("desc")

    def * = (id.?, name, email, password, avatarURL, desc)<>
      ((User.apply _).tupled, User.unapply)
  }

}