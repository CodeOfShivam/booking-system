// import React, { useRef, useEffect, useState, useCallback } from "react";
// import * as d3 from "d3";

// // Define PropTypes for better type checking and documentation
// interface BoxplotDataPoint {
//   group: string;
//   value: number;
// }

// interface BoxplotProps {
//   data: BoxplotDataPoint[];
//   chartType?: "basic" | "scatter" | "horizontal";
//   width?: number;
//   height?: number;
//   margin?: { top: number; right: number; bottom: number; left: number };
//   colors?: string[];
//   xAxisLabel?: string;
//   yAxisLabel?: string;
//   title?: string;
//   showTooltip?: boolean;
//   tooltipFormatter?: (d: string | number | Date | null | undefined) => string;
//   // Add more customization options as needed
//   className?: string; // For Tailwind CSS classes
// }

// const BoxplotChart: React.FC<BoxplotProps> = ({
//   data,
//   chartType = "basic",
//   width = 600,
//   height = 400,
//   margin = { top: 40, right: 30, bottom: 60, left: 70 },
//   colors = d3.schemeTableau10, // Default color scheme
//   xAxisLabel = "Group",
//   yAxisLabel = "Value",
//   title = "Boxplot Chart",
//   showTooltip = true,
//   tooltipFormatter,
// }) => {
//   const svgRef = useRef<SVGSVGElement | null>(null);
//   const tooltipRef = useRef<HTMLDivElement | null>(null);
//   interface BoxplotStats {
//     group: string;
//     q1: number;
//     median: number;
//     q3: number;
//     min: number;
//     max: number;
//     outliers: number[];
//     allValues: number[];
//   }
//   const [processedData, setProcessedData] = useState<BoxplotStats[]>([]); // Data processed for boxplot calculations

//   // Memoize data processing to avoid recalculations
//   const processBoxplotData = useCallback(() => {
//     // Group data by 'group'
//     const groupedData = Array.from(d3.group(data, (d) => d.group));

//     // Calculate boxplot statistics for each group
//     const boxplotStats = groupedData.map(([group, values]) => {
//       const sortedValues = values.map((d) => d.value).sort(d3.ascending);
//       const q1 = d3.quantile(sortedValues, 0.25) || 0;
//       const median = d3.quantile(sortedValues, 0.5) || 0;
//       const q3 = d3.quantile(sortedValues, 0.75) || 0;
//       const interQuartileRange = q3 - q1;
//       const min = q1 - 1.5 * interQuartileRange;
//       const max = q3 + 1.5 * interQuartileRange;

//       // Find actual min/max within the whisker range, considering outliers
//       const actualMin = d3.min(sortedValues.filter((d) => d >= min));
//       const actualMax = d3.max(sortedValues.filter((d) => d <= max));

//       // Outliers are values outside the whiskers
//       const outliers = sortedValues.filter((d) => d < min || d > max);

//       return {
//         group,
//         q1,
//         median,
//         q3,
//         min: actualMin || min, // Use actual min/max within whisker range
//         max: actualMax || max, // Use actual min/max within whisker range
//         outliers,
//         allValues: sortedValues, // Keep all values for scatter boxplot
//       };
//     });
//     setProcessedData(boxplotStats);
//   }, [data]);

//   useEffect(() => {
//     processBoxplotData();
//   }, [data, processBoxplotData]);

//   useEffect(() => {
//     if (!svgRef.current || processedData.length === 0) return;

//     const svg = d3.select(svgRef.current);
//     svg.selectAll("*").remove(); // Clear previous chart elements

//     const innerWidth = width - margin.left - margin.right;
//     const innerHeight = height - margin.top - margin.bottom;

//     const g = svg
//       .append("g")
//       .attr("transform", `translate(${margin.left},${margin.top})`);

//     // Define scales based on chart type
//     let xScale: d3.ScaleBand<string> | d3.ScaleLinear<number, number>;
//     let yScale: d3.ScaleLinear<number, number> | d3.ScaleBand<string>;

//     const allValues = processedData.flatMap((d) => d.allValues);
//     const yDomain = [d3.min(allValues) || 0, d3.max(allValues) || 0];

//     const groups = processedData.map((d) => d.group);

//     if (chartType === "horizontal") {
//       xScale = d3
//         .scaleLinear()
//         .domain(yDomain) // X-axis represents values
//         .range([0, innerWidth])
//         .nice();

//       yScale = d3
//         .scaleBand()
//         .domain(groups)
//         .range([0, innerHeight])
//         .paddingInner(0.7)
//         .paddingOuter(0.5);
//     } else {
//       // Basic and Scatter
//       xScale = d3
//         .scaleBand()
//         .domain(groups)
//         .range([0, innerWidth])
//         .paddingInner(0.7)
//         .paddingOuter(0.5);

//       yScale = d3.scaleLinear().domain(yDomain).range([innerHeight, 0]).nice();
//     }

//     // Append Axes
//     if (chartType === "horizontal") {
//       g.append("g")
//         .attr("transform", `translate(0, ${innerHeight})`)
//         .call(d3.axisBottom(xScale));

//       g.append("g").call(d3.axisLeft(yScale));

//       // X-axis label
//       g.append("text")
//         .attr("class", "axis-label")
//         .attr("x", innerWidth / 2)
//         .attr("y", innerHeight + margin.bottom - 15)
//         .attr("text-anchor", "middle")
//         .text(yAxisLabel) // Label for the value axis
//         .attr("fill", "currentColor");

//       // Y-axis label
//       g.append("text")
//         .attr("class", "axis-label")
//         .attr("transform", `rotate(-90)`)
//         .attr("x", -innerHeight / 2)
//         .attr("y", -margin.left + 20)
//         .attr("text-anchor", "middle")
//         .text(xAxisLabel) // Label for the group axis
//         .attr("fill", "currentColor");
//     } else {
//       g.append("g")
//         .attr("transform", `translate(0, ${innerHeight})`)
//         .call(d3.axisBottom(xScale));

//       g.append("g").call(d3.axisLeft(yScale));

//       // X-axis label
//       g.append("text")
//         .attr("class", "axis-label")
//         .attr("x", innerWidth / 2)
//         .attr("y", innerHeight + margin.bottom - 15)
//         .attr("text-anchor", "middle")
//         .text(xAxisLabel)
//         .attr("fill", "currentColor");

//       // Y-axis label
//       g.append("text")
//         .attr("class", "axis-label")
//         .attr("transform", `rotate(-90)`)
//         .attr("x", -innerHeight / 2)
//         .attr("y", -margin.left + 20)
//         .attr("text-anchor", "middle")
//         .text(yAxisLabel)
//         .attr("fill", "currentColor");
//     }

//     // Chart Title
//     svg
//       .append("text")
//       .attr("x", width / 2)
//       .attr("y", margin.top / 2 + 10)
//       .attr("text-anchor", "middle")
//       .attr("class", "chart-title text-lg font-semibold")
//       .text(title)
//       .attr("fill", "currentColor");

//     // Draw Boxplots
//     processedData.forEach((d, i) => {
//       const color = colors[i % colors.length];

//       let xPos, yPos, barWidth, barHeight;

//       if (chartType === "horizontal") {
//         xPos = xScale(d.q1);
//         yPos = yScale(d.group);
//         barWidth = xScale(d.q3) - xScale(d.q1);
//         barHeight = yScale.bandwidth();
//       } else {
//         xPos = xScale(d.group);
//         yPos = yScale(d.q3);
//         barWidth = xScale.bandwidth();
//         barHeight = yScale(d.q1) - yScale(d.q3);
//       }

//       // Box
//       g.append("rect")
//         .attr("x", chartType === "horizontal" ? xPos : xPos)
//         .attr("y", chartType === "horizontal" ? yPos : yPos)
//         .attr("width", chartType === "horizontal" ? barWidth : barWidth)
//         .attr("height", chartType === "horizontal" ? barHeight : barHeight)
//         .attr("stroke", color)
//         .attr("fill", color)
//         .attr("fill-opacity", 0.3)
//         .attr("class", "boxplot-box");

//       // Median Line
//       g.append("line")
//         .attr("x1", chartType === "horizontal" ? xScale(d.median) : xPos)
//         .attr("y1", chartType === "horizontal" ? yPos : yScale(d.median))
//         .attr(
//           "x2",
//           chartType === "horizontal" ? xScale(d.median) : xPos + barWidth
//         )
//         .attr(
//           "y2",
//           chartType === "horizontal" ? yPos + barHeight : yScale(d.median)
//         )
//         .attr("stroke", color)
//         .attr("stroke-width", 2)
//         .attr("class", "boxplot-median-line");

//       // Whiskers
//       g.append("line")
//         .attr(
//           "x1",
//           chartType === "horizontal" ? xScale(d.min) : xPos + barWidth / 2
//         )
//         .attr(
//           "y1",
//           chartType === "horizontal" ? yPos + barHeight / 2 : yScale(d.q1)
//         )
//         .attr(
//           "x2",
//           chartType === "horizontal" ? xScale(d.q1) : xPos + barWidth / 2
//         )
//         .attr(
//           "y2",
//           chartType === "horizontal" ? yPos + barHeight / 2 : yScale(d.q1)
//         )
//         .attr("stroke", color)
//         .attr("stroke-width", 1)
//         .attr("class", "boxplot-whisker");

//       g.append("line")
//         .attr(
//           "x1",
//           chartType === "horizontal" ? xScale(d.max) : xPos + barWidth / 2
//         )
//         .attr(
//           "y1",
//           chartType === "horizontal" ? yPos + barHeight / 2 : yScale(d.q3)
//         )
//         .attr(
//           "x2",
//           chartType === "horizontal" ? xScale(d.q3) : xPos + barWidth / 2
//         )
//         .attr(
//           "y2",
//           chartType === "horizontal" ? yPos + barHeight / 2 : yScale(d.q3)
//         )
//         .attr("stroke", color)
//         .attr("stroke-width", 1)
//         .attr("class", "boxplot-whisker");

//       // Caps for whiskers
//       g.append("line")
//         .attr(
//           "x1",
//           chartType === "horizontal" ? xScale(d.min) : xPos + barWidth * 0.25
//         )
//         .attr(
//           "y1",
//           chartType === "horizontal" ? yPos + barHeight * 0.25 : yScale(d.min)
//         )
//         .attr(
//           "x2",
//           chartType === "horizontal" ? xScale(d.min) : xPos + barWidth * 0.75
//         )
//         .attr(
//           "y2",
//           chartType === "horizontal" ? yPos + barHeight * 0.75 : yScale(d.min)
//         )
//         .attr("stroke", color)
//         .attr("stroke-width", 1)
//         .attr("class", "boxplot-whisker-cap");

//       g.append("line")
//         .attr(
//           "x1",
//           chartType === "horizontal" ? xScale(d.max) : xPos + barWidth * 0.25
//         )
//         .attr(
//           "y1",
//           chartType === "horizontal" ? yPos + barHeight * 0.25 : yScale(d.max)
//         )
//         .attr(
//           "x2",
//           chartType === "horizontal" ? xScale(d.max) : xPos + barWidth * 0.75
//         )
//         .attr(
//           "y2",
//           chartType === "horizontal" ? yPos + barHeight * 0.75 : yScale(d.max)
//         )
//         .attr("stroke", color)
//         .attr("stroke-width", 1)
//         .attr("class", "boxplot-whisker-cap");

//       // Scatter plot for individual points (if chartType is 'scatter')
//       if (chartType === "scatter") {
//         const jitterWidth = xScale.bandwidth() * 0.6; // Control scatter width
//         d.allValues.forEach((value: number) => {
//           g.append("circle")
//             .attr(
//               "cx",
//               chartType === "horizontal"
//                 ? xScale(value)
//                 : xPos + barWidth / 2 + (Math.random() - 0.5) * jitterWidth
//             )
//             .attr(
//               "cy",
//               chartType === "horizontal"
//                 ? yPos + barHeight / 2 + (Math.random() - 0.5) * jitterWidth
//                 : yScale(value)
//             )
//             .attr("r", 3)
//             .attr("fill", color)
//             .attr("opacity", 0.6)
//             .attr("stroke", "none")
//             .attr("class", "boxplot-scatter-point");
//         });
//       }

//       // Outliers
//       d.outliers.forEach((outlier: number) => {
//         g.append("circle")
//           .attr(
//             "cx",
//             chartType === "horizontal" ? xScale(outlier) : xPos + barWidth / 2
//           )
//           .attr(
//             "cy",
//             chartType === "horizontal" ? yPos + barHeight / 2 : yScale(outlier)
//           )
//           .attr("r", 4)
//           .attr("fill", color)
//           .attr("stroke", "currentColor")
//           .attr("stroke-width", 1)
//           .attr("class", "boxplot-outlier");
//       });

//       // Tooltip interaction (optional but recommended for accessibility)
//       if (showTooltip) {
//         // Create an invisible rect for each box for easy hovering
//         g.append("rect")
//           .attr(
//             "x",
//             chartType === "horizontal" ? xScale(d3.min(d.allValues) || 0) : xPos
//           )
//           .attr(
//             "y",
//             chartType === "horizontal" ? yPos : yScale(d3.max(d.allValues) || 0)
//           )
//           .attr(
//             "width",
//             chartType === "horizontal"
//               ? xScale(d3.max(d.allValues) || 0) -
//                   xScale(d3.min(d.allValues) || 0)
//               : barWidth
//           )
//           .attr(
//             "height",
//             chartType === "horizontal"
//               ? barHeight
//               : yScale(d3.min(d.allValues) || 0) -
//                   yScale(d3.max(d.allValues) || 0)
//           )
//           .attr("fill", "transparent")
//           .on("mouseover", (event) => {
//             console.log(event);

//             d3.select(tooltipRef.current)
//               .style("opacity", 1)
//               .html(
//                 tooltipFormatter
//                   ? tooltipFormatter(d)
//                   : `
//                 <div class="p-2 bg-popover text-popover-foreground rounded-md shadow-md text-sm">
//                   <p><strong>Group:</strong> ${d.group}</p>
//                   <p><strong>Min:</strong> ${d.min.toFixed(2)}</p>
//                   <p><strong>Q1:</strong> ${d.q1.toFixed(2)}</p>
//                   <p><strong>Median:</strong> ${d.median.toFixed(2)}</p>
//                   <p><strong>Q3:</strong> ${d.q3.toFixed(2)}</p>
//                   <p><strong>Max:</strong> ${d.max.toFixed(2)}</p>
//                   ${
//                     d.outliers.length > 0
//                       ? `<p><strong>Outliers:</strong> ${d.outliers
//                           .map((o: number) => o.toFixed(2))
//                           .join(", ")}</p>`
//                       : ""
//                   }
//                 </div>
//               `
//               );
//           })
//           .on("mousemove", (event) => {
//             d3.select(tooltipRef.current)
//               .style("left", `${event.pageX + 10}px`)
//               .style("top", `${event.pageY - 20}px`);
//           })
//           .on("mouseout", () => {
//             d3.select(tooltipRef.current).style("opacity", 0);
//           });
//       }
//     });

//     // Make axes visible and styled with Tailwind
//     g.selectAll(".domain, .tick line").attr("stroke", "currentColor");
//     g.selectAll(".tick text").attr("fill", "currentColor");
//   }, [
//     width,
//     height,
//     margin,
//     processedData,
//     chartType,
//     colors,
//     xAxisLabel,
//     yAxisLabel,
//     title,
//     showTooltip,
//     tooltipFormatter,
//   ]);

//   return (
//     <>
//       <svg ref={svgRef} width={width} height={height} className="block"></svg>
//       {showTooltip && (
//         <div
//           ref={tooltipRef}
//           className="absolute opacity-0 pointer-events-none transition-opacity duration-200"
//           style={{ zIndex: 100 }}
//         ></div>
//       )}
//     </>
//   );
// };

// export default BoxplotChart;
