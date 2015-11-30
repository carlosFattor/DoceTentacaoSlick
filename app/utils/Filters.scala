package utils

import javax.inject.Inject

import play.api.http.HttpFilters
import play.filters.gzip.GzipFilter

/**
 * Created by carlos on 28/11/15.
 */
class Filters @Inject() (gzipFilter: GzipFilter) extends HttpFilters {
  def filters = Seq(gzipFilter)
}
