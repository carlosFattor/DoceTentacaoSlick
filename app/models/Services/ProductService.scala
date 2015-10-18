package models.Services

import java.util.UUID
import javax.inject.Inject
import models.DAOs.ProductDAO
import models.Product
import scala.concurrent.Future

/**
 * Created by carlos on 16/10/15.
 */
class ProductService @Inject()(productDAO: ProductDAO)  {

  def findListProduct(): Future[Seq[Product]] = {
    ???
  }
  def addProduct(user: Product): Future[Option[Product]] = {
    ???
  }
  def findProduct(id: UUID): Future[Option[Product]] = {
    ???
  }
  def updateProduct(user: Product): Future[Int] = {
    ???
  }
  def removeProduct(id: UUID): Future[Int] = {
    ???
  }
  def findProductByName(email: String): Future[Option[Product]] = {
    ???
  }

}
