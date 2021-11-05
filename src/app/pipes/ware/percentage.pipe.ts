import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'percentage',
})
export class percentage implements PipeTransform {
    /**
     *
     *
     * @param {string} value
     * @returns
     * @memberof BetStatusPipe
     */
    transform(value: string) {
        let num = Number(value);
        num = num * 100;
        let percent = num.toFixed(2) + '%';
        // if (percent === '0%') {
        //     percent = '0.00%';
        // }
        return percent;
    }
}
