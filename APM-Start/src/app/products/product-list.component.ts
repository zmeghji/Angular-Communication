import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    ngAfterViewInit(): void {
        // this.filterElementRef.nativeElement.focus();
    }

    pageTitle: string = 'Product List';
    private _listFilter : string;
    private _sub : Subscription;
    get listFilter(): string{
        return this._listFilter;
    }
    set listFilter(value: string){
        this._listFilter = value;
        if (!this._sub){
        this._sub= this.filterInput.valueChanges.subscribe( x=>{
            this.performFilter(x);
        })
    }
        

        
        this.filterElementRef.nativeElement.focus();

    }
    // listFilter: string;
    showImage: boolean;
    @ViewChild('filterElement') filterElementRef : ElementRef;
    // @ViewChild(NgModel) filterInput: NgModel;
    private _filterInput: NgModel;
    get filterInput(){
        return this._filterInput;
    }
    @ViewChild(NgModel)
    set filterInput(input: NgModel ){
        this._filterInput = input;
    }
    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    filteredProducts: IProduct[];
    products: IProduct[];

    constructor(private productService: ProductService) { }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.performFilter(this.listFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );

        // this.filterInput.valueChanges.subscribe( x=>{
        //     this.performFilter(x);
        // })
    }
    onFilterChange(filter: string){
        this.listFilter = filter;
    }
    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }
}
