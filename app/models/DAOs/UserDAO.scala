package models.DAOs

import javax.inject.{Inject, Singleton}

import play.api.db.slick.DatabaseConfigProvider
import play.api.{Logger}
import slick.driver.PostgresDriver.api._
import models.User
import models.User.UserTable
import slick.lifted.TableQuery
import scala.concurrent.Future

/**
 * Created by carlos on 15/10/15.
 */
@Singleton
class UserDAO @Inject()(protected val dbConfigProvider: DatabaseConfigProvider) extends GenericCRUD[UserTable, User] {
  override val table = TableQuery[UserTable]

  def findByEmail(email: String): Future[Option[User]] = {
    val findEmail = table.filter(_.email === email)
    Logger.info(s"Query findById: ${findEmail.result.statements}")
    db.run(findEmail.result.headOption)
  }
}