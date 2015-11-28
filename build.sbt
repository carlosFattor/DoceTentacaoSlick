name := """DoceTentacaoSlick"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala).enablePlugins(SbtTwirl).enablePlugins(SbtWeb)

scalaVersion := "2.11.7"

pipelineStages in Assets := Seq()
pipelineStages := Seq(rjs, uglify, digest, gzip)
DigestKeys.algorithms += "sha1"

libraryDependencies ++= Seq(
  cache,
  ws,
  specs2 % Test,
  "org.postgresql" % "postgresql" % "9.4-1201-jdbc41",
  "com.typesafe.play" %% "play-slick" % "1.1.1",
  "com.typesafe.play" %% "play-slick-evolutions" % "1.1.1",
  "com.typesafe.play" %% "play-mailer" % "3.0.1"
)

resolvers += "scalaz-bintray" at "http://dl.bintray.com/scalaz/releases"
resolvers += "Typesafe repository" at "http://repo.typesafe.com/typesafe/releases/"

routesGenerator := InjectedRoutesGenerator
