package models

import java.util.UUID

/**
 * Created by carlos on 14/10/15.
 */
case class Product (id: Option[UUID],
                    categoryID: UUID,
                    name: String,
                    desc: String,
                    imgSmallURL: String,
                    imgLargeURL: String,
                    comments: String,
                    feature: Option[Boolean])

