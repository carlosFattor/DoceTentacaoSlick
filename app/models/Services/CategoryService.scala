package models.Services

import java.util.UUID
import javax.inject.Inject

import models.Category
import models.DAOs.{ProductDAO, CategoryDAO}
import scala.concurrent.ExecutionContext.Implicits._
import scala.concurrent.Future

/**
 * Created by carlos on 17/10/15.
 */
class CategoryService @Inject()(categoryDAO: CategoryDAO, prodDAO: ProductDAO) {

  def add(cat: Category): Future[Option[Category]] = {
    categoryDAO.insert(cat).map{ uuid =>
      Option(cat.copy(id = Option(uuid)))
    }
  }

  def list: Future[Seq[Category]] = {
    categoryDAO.list
  }

  def findByID(catID: UUID): Future[Option[Category]] = {
    categoryDAO.findByID(catID)
  }

  def update(cat: Category): Future[Int] = {
    categoryDAO.update(cat.id.get, cat)
  }

  def delete(id: UUID): Future[Int] = {
    val sizeF = prodDAO.countByIDCategory(id)

    sizeF.flatMap{ size =>
      if(size == 0){
        categoryDAO.delete(id)
      } else {
        Future.successful(0)
      }
    }
  }
}
