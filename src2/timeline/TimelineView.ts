import { View, DateComponentRenderState, RenderForceFlags } from 'fullcalendar'
import TimeAxis from './TimeAxis'
import TimelineLane from './TimelineLane'

export default class TimelineView extends View {

  // child components
  timeAxis: TimeAxis
  lane: TimelineLane

  renderSkeleton() {
    this.el.classList.add('fc-timeline')
    this.el.innerHTML = this.renderSkeletonHtml()

    let headerContainerEl = this.el.querySelector('thead .fc-time-area')
    let bodyContainerEl = this.el.querySelector('tbody .fc-time-area')

    this.timeAxis = new TimeAxis(this.view)
    this.timeAxis.setParents(headerContainerEl, bodyContainerEl)

    this.lane = new TimelineLane(this.view)
    this.lane.setParents(
      this.timeAxis.layout.bodyScroller.enhancedScroll.canvas.contentEl,
      this.timeAxis.layout.bodyScroller.enhancedScroll.canvas.bgEl,
      this.timeAxis
    )
  }

  renderSkeletonHtml() {
    let theme = this.getTheme()

    return `<table class="` + theme.getClass('tableGrid') + `"> \
<thead class="fc-head"> \
<tr> \
<td class="fc-time-area ` + theme.getClass('widgetHeader') + `"></td> \
</tr> \
</thead> \
<tbody class="fc-body"> \
<tr> \
<td class="fc-time-area ` + theme.getClass('widgetContent') + `"></td> \
</tr> \
</tbody> \
</table>`
  }

  renderChildren(props: DateComponentRenderState, forceFlags: RenderForceFlags) {
    this.timeAxis.render({
      dateProfile: props.dateProfile
    }, forceFlags)

    this.lane.render(props, forceFlags)
  }

  updateSize(totalHeight, isAuto, force) {
    this.timeAxis.updateSize(totalHeight, isAuto)
    this.lane.updateSize(totalHeight, isAuto, force)
  }

  removeElement() {
    this.timeAxis.removeElements()
    this.lane.removeElement() // TODO: doesn't work with two containers

    super.removeElement()
  }

}
