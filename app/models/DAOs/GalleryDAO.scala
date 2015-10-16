package models.DAOs

import javax.inject.Inject

import models.Gallery
import models.Gallery.GalleryTable
import play.api.db.slick.DatabaseConfigProvider
import slick.lifted.TableQuery

/**
 * Created by carlos on 15/10/15.
 */
class GalleryDAO @Inject()(protected val dbConfigProvider: DatabaseConfigProvider) extends GenericCRUD[GalleryTable, Gallery]{

  override val table = TableQuery[GalleryTable]
}
