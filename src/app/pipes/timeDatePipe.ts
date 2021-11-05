import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'timeDate',
})
export class timeDate implements PipeTransform {
  /**
   *
   *
   * @param {string} value
   * @returns
   * @memberof BetStatusPipe
   */
  transform(value: string) {
    var date = new Date(Number(value) * 1000);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y + M + D + h + m + s;
    return status;
  }
}
