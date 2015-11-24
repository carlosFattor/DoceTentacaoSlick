package models.Services

import java.util.UUID
import javax.inject.Inject
import akka.actor.Status.Success
import models.DAOs.{ProductDAO, UserDAO}
import models.User
import utils.Base64
import scala.concurrent.ExecutionContext.Implicits._
import scala.concurrent.Future

/**
 * Created by carlos on 16/10/15.
 */
class UserService @Inject()(userDAO: UserDAO) {

  def findListUser(): Future[Seq[User]] = {
    userDAO.list
  }

  def addUser(user: User): Future[Option[User]] = {
    val newUser = user.copy(password = Base64.encodeString(user.password))
    userDAO.insert(newUser).map { uuid =>
      val finishedUser = newUser.copy(id = Option(uuid))
      Option(finishedUser)
    }
  }

  def findUser(id: UUID): Future[Option[User]] = {
    userDAO.findByID(id)
  }

  def updateUSer(user: User): Future[Int] = {
    val newUser = user.copy(password = Base64.encodeString(user.password))
    userDAO.update(user.id.get, newUser)
  }

  def removeUser(id: UUID): Future[Int] = {
    userDAO.delete(id)
  }

  def findUserByEmail(email: String): Future[Option[User]] = {
    userDAO.findByEmail(email)
  }

  def validateUser(email: String, password: String): Future[Option[User]] = {
    userDAO.findByEmail(email).map { user =>
      user.filter(u => u.password == (Base64.encodeString(password)))
    }
  }

  def deleteUser(id: UUID) = {
    userDAO.delete(id)
  }
}
