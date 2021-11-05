import { NgModule } from '@angular/core';
import { KeyTranslationPipe } from './keyTranslation.pipe';
import { KeyValueDelPipe } from './keyValueDel.pipe';
import { ObjectKeysPipe } from './ObjectKeys.pipe';
import { timeDate } from './timeDatePipe';
import { percentage } from './ware/percentage.pipe';
@NgModule({
    declarations:
        [
            KeyTranslationPipe,
            KeyValueDelPipe,
            timeDate,
            ObjectKeysPipe,
            percentage,
        ],
    imports: [],
    exports:
        [
            KeyTranslationPipe,
            KeyValueDelPipe,
            timeDate,
            ObjectKeysPipe,
            percentage
        ]
})
export class PipesModule { }
