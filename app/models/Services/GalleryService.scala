package models.Services

import java.util.UUID
import javax.inject.Inject
import models.DAOs.GalleryDAO
import models.Gallery
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits._


/**
 * Created by carlos on 23/10/15.
 */
class GalleryService @Inject()(galDAO: GalleryDAO) {

  def findListGallery = {
    galDAO.list
  }

  def addGallery(gal: Gallery): Future[Option[Gallery]] = {
    galDAO.insert(gal).map { uuid =>
      Option(gal.copy(id = Option(uuid)))
    }
  }

  def findGallery(id: UUID): Future[Option[Gallery]] = {
    galDAO.findByID(id)
  }

  def updateGallery(gal: Gallery): Future[Int] = {
    galDAO.update(gal.id.getOrElse(UUID.fromString("")), gal)
  }

  def removeGallery(id: UUID): Future[Int] = {
    galDAO.delete(id)
  }
}
