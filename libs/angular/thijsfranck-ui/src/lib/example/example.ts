import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "thijsfranck-example",
    imports: [],
    templateUrl: "./example.html",
    styleUrls: ["./example.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Example {}
