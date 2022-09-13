export interface IChart {
  tag: string
  value: {
    d: string
    v: number
  }[]
  displayName?: string
  axisName?: string
  visibleOnChart?: boolean
  canRemove?: boolean
  defaultDraw?: boolean
  colorLine?: string
  descriptor?: string
}
