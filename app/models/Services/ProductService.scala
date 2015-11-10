package models.Services

import java.util.UUID
import javax.inject.Inject
import models.DAOs.ProductDAO
import models.Product
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits._

/**
 * Created by carlos on 16/10/15.
 */
class ProductService @Inject()(productDAO: ProductDAO) {

  def findListProduct(): Future[Seq[Product]] = {
    productDAO.list
  }

  def findListProductFeatured(): Future[Seq[Product]] = {
    productDAO.listFeatured()
  }

  def findByIdCategory(id: UUID): Future[Seq[Product]] = {
    productDAO.findByIdCategory(id)
  }

  def addProduct(prod: Product): Future[Option[Product]] = {
    productDAO.insert(prod).map { uuid =>
      Option(prod.copy(id = Option(uuid)))
    }
  }

  def findProduct(id: UUID): Future[Option[Product]] = {
    productDAO.findByID(id)
  }

  def updateProduct(user: Product): Future[Int] = {
    productDAO.update(user.id.getOrElse(UUID.fromString("")), user)
  }

  def removeProduct(id: UUID): Future[Int] = {
    productDAO.delete(id)
  }

  def findProductByName(email: String): Future[Option[Product]] = {
    productDAO.findByEmail(email)
  }
}
