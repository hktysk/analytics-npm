export type Downloads = {
  downloads: number
  day: string
}
export interface InformationAboutDownload {
  start: string
  end: string
  package: string
  downloads: Downloads[]
}
