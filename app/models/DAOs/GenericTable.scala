package models.DAOs

import java.util.UUID

import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfig}
import play.api.{Logger, Play}
import slick.driver.JdbcProfile
import slick.driver.PostgresDriver.api._
import slick.lifted.Tag
import scala.concurrent.ExecutionContext.Implicits._
import scala.concurrent.Future

/**
 * Created by carlos on 14/10/15.
 */
abstract class GenericTable[T](tag: Tag, name: String) extends Table[T](tag, name) {
  def id = column[UUID]("id", O.PrimaryKey, O.AutoInc)
}

trait GenericCRUD[C <: GenericTable[T], T] extends HasDatabaseConfig[JdbcProfile] {
  val dbConfig = DatabaseConfigProvider.get[JdbcProfile](Play.current)

  val table: TableQuery[C]

  private val queryById = Compiled((id: Rep[UUID]) => table.filter(_.id === id))

  def list: Future[Seq[C#TableElementType]] = {
    val list = table.result
    Logger.info(s"Query list: ${list.headOption.statements}")
    db.run(list).map(_.toList)
  }

  def insert(c: C#TableElementType): Future[UUID] = {
    val insertion = (table returning table.map(_.id)) += c
    Logger.info(s"Query insert: ${insertion.statements}")
    db.run(insertion)
  }

  def update(id: UUID, c: C#TableElementType): Future[Int] = {
    Logger.info(s"Query update: ${queryById(id).update(c).statements}")
    db.run(queryById(id).update(c))
  }

  def delete(id: UUID): Future[Int] = {
    Logger.info(s"Query delete: ${queryById(id).delete.statements}")
    db.run(queryById(id).delete)
  }

  def findByID(id: UUID): Future[Option[C#TableElementType]] = {
    Logger.info(s"Query findByID: ${queryById(id).result.headOption.statements}")
    db.run(queryById(id).result.headOption)
  }

  def count: Future[Int] = {
    Logger.info(s"Query count: ${table.length.result.statements}")
    db.run(table.length.result)
  }
}