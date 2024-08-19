  import { Component, Input, OnDestroy, OnInit } from '@angular/core';
  import * as d3 from 'd3';
  import { Record } from '../../models/Record';
import { Observable, Subscription } from 'rxjs';
import { RecordService } from '../../services/record.service';
import { ActivatedRoute } from '@angular/router';

  @Component({
    selector: 'app-product-page',
    templateUrl: './product-page.component.html',
    styleUrl: './product-page.component.css'
  })
  export class ProductPageComponent  implements OnInit,OnDestroy{
    private svg: any;
    private margin = { top: 20, right: 30, bottom: 50, left: 50 };
    private width = 960 - this.margin.left - this.margin.right;
    private height = 500 - this.margin.top - this.margin.bottom;
    private records:Record[]
    private subscreptions:Subscription[]
    private productId:number; 
    private latestPrice:number;
     selectedTime:number;
    constructor(private recordService:RecordService,private activatedRouter:ActivatedRoute){
      
    }


     ngOnInit(): void {
      this.subscreptions=[]
      this.subscreptions.push(  this.activatedRouter.params.subscribe(params=>{
        this.productId=params['id'];
        this.getProductRecordsLastTrimester();
        this.selectedTime=3;
      }))
     
   
     }
     getProductRecordsLastTrimester(){
      
      this.subscreptions.push((this.recordService.getProductRecordsLastTrimester(this.productId) as Observable<Record[]>).subscribe(
        records=>{
          this.records=records

          this.selectedTime=3;
    this.clearPlot();
    this.createSvg();
    this.drawPlot(records);
        }
      ))
     }
     getProductRecordsLastWeek(){
      this.subscreptions.push((this.recordService.getProductRecordsLastWeek(this.productId) as Observable<Record[]>).subscribe(
        records=>{
          this.records=records;
          this.selectedTime=1;
          this.clearPlot();
    this.createSvg();
    this.drawPlot(records);
        }
      ))
     }
     getProductRecordsLastMonth(){
      this.subscreptions.push((this.recordService.getProductRecordsLastMonth(this.productId) as Observable<Record[]>).subscribe(
        records=>{
          this.records=records;
          this.selectedTime=2;
          this.clearPlot();
          this.createSvg();
          this.drawPlot(records);
        }
      ))
     }
     getProductRecordsLastYear(){
      this.subscreptions.push((this.recordService.getProductRecordsLastYear(this.productId) as Observable<Record[]>).subscribe(
        records=>{
          this.records=records;
          this.selectedTime=4;
          this.clearPlot();
          this.createSvg();
          this.drawPlot(records);
        }
      ))
     }
     private clearPlot(): void {
      d3.select('#scatterPlot').selectAll("*").remove();
  }
     private createSvg(): void {
      this.svg = d3.select('#scatterPlot')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
      .style('background-color', '#f7f7f7'); // Light grey background color
    }
    
  
    private drawPlot(records: Record[]): void {
      // Ensure dates are parsed as Date objects
      records.forEach(d => d.getDate());
  
      // Sort records by date
      records.sort((a, b) => a.getDate().getTime() - b.getDate().getTime());
  
      const x = d3.scaleTime()
          .domain([
              d3.timeDay.offset(d3.min(records, (d: Record) => d.getDate()) as Date, -1), // Adding a padding of 1 day before the first date
              d3.max(records, (d: Record) => d.getDate()) as Date
          ])
          .range([0, this.width]);
  
      const y = d3.scaleLinear()
          .domain([0, d3.max(records, (d: Record) => d.getAveragePrice()) as number])
          .range([this.height, 0]);
  
    // Append x-axis
this.svg.append('g')
.attr('transform', 'translate(0,' + this.height + ')')
.call(d3.axisBottom(x).ticks(5).tickFormat(d3.timeFormat("%b %d")))
.attr('class', 'x-axis')
.append('text')
.attr('fill', '#000')
.attr('x', this.width)
.attr('y', 35)
.attr('text-anchor', 'end')
.text('Date')
.style('font-size', '14px')
.style('font-family', 'Arial')
.style('font-weight', 'bold')
.style('fill', '#333'); // Darker text color

// Append y-axis
this.svg.append('g')
.call(d3.axisLeft(y))
.attr('class', 'y-axis')
.append('text')
.attr('fill', '#000')
.attr('x', 6)
.attr('y', -10)
.attr('text-anchor', 'end')
.text('Price')
.style('font-size', '14px')
.style('font-family', 'Arial')
.style('font-weight', 'bold')
.style('fill', '#333'); // Darker text color
  // Add gridlines
const makeXGridlines = () => d3.axisBottom(x).ticks(5);
const makeYGridlines = () => d3.axisLeft(y).ticks(5);

// Add the X gridlines
this.svg.append('g')			
    .attr('class', 'grid')
    .attr('transform', 'translate(0,' + this.height + ')')
    .call(makeXGridlines()
        .tickSize(-this.height)
        .tickFormat('' as any))
    .selectAll('line')
    .style('stroke', '#ddd'); // Light grey grid lines

// Add the Y gridlines
this.svg.append('g')			
    .attr('class', 'grid')
    .call(makeYGridlines()
        .tickSize(-this.width)
        .tickFormat('' as any))
    .selectAll('line')
    .style('stroke', '#ddd'); // Light grey grid lines
  // Define the line
const line = d3.line<Record>()
.x((d: Record) => x(d.getDate()))
.y((d: Record) => y(d.getAveragePrice()));

this.svg.append('path')
    .datum(records)
    .attr('fill', 'none')
    .attr('stroke', '#ff6347') // Tomato red color
    .attr('stroke-width', 3) // Increase line thickness
    .attr('d', line);
// Add circles at data points
this.svg.selectAll('circle')
    .data(records)
    .enter()
    .append('circle')
    .attr('cx', (d: Record) => x(d.getDate()))
    .attr('cy', (d: Record) => y(d.getAveragePrice()))
    .attr('r', 5)
    .attr('fill', '#69b3a2') // Sea green color
    .style('stroke', '#333') // Dark stroke
    .style('stroke-width', 1.5)
    .on('mouseover', function(event, d) {
        d3.select(this).transition().duration(200).attr('r', 7);
        // Add tooltip here
    })
    .on('mouseout', function(event, d) {
        d3.select(this).transition().duration(200).attr('r', 5);
        // Remove tooltip here
    }); 
  }
  

  ngOnDestroy(): void {
    for(let subscription of this.subscreptions){
      subscription.unsubscribe()
    }
  }
  }
