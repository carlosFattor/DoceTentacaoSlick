package models.Services

import java.util.UUID
import javax.inject.Inject

import models.DAOs.UserDAO
import models.User
import scala.concurrent.ExecutionContext.Implicits._
import scala.concurrent.Future

/**
 * Created by carlos on 16/10/15.
 */
class UserServiceImp @Inject()(userDAO: UserDAO) extends UserService {

  def findListUser(): Future[Seq[User]] = {
    userDAO.list
  }
  def addUser(user: User): Future[Option[User]] = {
    userDAO.insert(user).map{ uuid =>
      val newUser = user.copy(id = Option(uuid))
      Option(newUser)
    }
  }
  def findUser(id: UUID): Future[Option[User]] = {
    userDAO.findByID(id)
  }
  def updateUSer(user: User): Future[Int] = {
    userDAO.update(user.id.get, user)
  }
  def removeUser(id: UUID): Future[Int] = {
    userDAO.delete(id)
  }
  def findUserByEmail(email: String): Future[Option[User]] = {
    userDAO.findByEmail(email)
  }
}

trait UserService {
  def findListUser(): Future[Seq[User]]
  def addUser(user: User): Future[Option[User]]
  def findUser(id: UUID): Future[Option[User]]
  def updateUSer(user: User): Future[Int]
  def removeUser(id: UUID): Future[Int]
  def findUserByEmail(email: String): Future[Option[User]]
}
