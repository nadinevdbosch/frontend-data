(function (d3$1) {
  'use strict';

  const endpoint = 'https://opendata.rdw.nl/resource/m9d7-ebf2.json?$limit=15000';
  let dataPersonenautos;
  let dataTaxis;

  const svg = d3$1.select('svg');

  const width = +svg.attr('width');
  const height = +svg.attr('height');

  const xScale = d3$1.scaleLinear();
    	
    
    const yScale = d3$1.scaleBand();
    	

  const render = data => {
    const xValue = d => d.value;
    const yValue = d => d.key;
    const margin = {top: 50, right: 50, bottom: 50, left: 100};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    console.log(xValue);
    
    xScale.domain([0, d3$1.max(data, xValue)]);
    xScale.range([0, innerWidth]);
    
    yScale.domain(data.map(yValue));
    yScale.range([0, innerHeight]);
    yScale.padding(0.1);
    
    
    const g = svg.append('g')
    	.attr('transform', `translate(${margin.left},${margin.top})`);
    
    g.append('g').call(d3$1.axisLeft(yScale));
    g.append('g').call(d3$1.axisBottom(xScale))
    	.attr('transform', `translate(0,${innerHeight})`);
    	
    
    g.selectAll('rect').data(data) // Hier zijn nog 0 rectangles
    	.enter().append('rect') // Hier maakt hij voor elk datapunt een rectangle aan
    		.attr('y', d => yScale(yValue(d)))
      	.attr('width', d => xScale(xValue(d)))
    		.attr('height', yScale.bandwidth());
  };



  d3.json(endpoint).then(data => {
      console.log("ruwe data", data);

      //filter personenauto
      let filteredData = filterDataRows(data, 'voertuigsoort' ,'Personenauto');
      console.log("filteren: data van alleen personenauto", filteredData);
    
    	//filter personenautos die geen taxis zijn
    	const personenautos = filterDataRows(filteredData, 'taxi_indicator' ,'Nee');
      console.log("filteren: data van alleen personenautos die geen taxis zijn", personenautos);
    
    	//filter personenautos die wel taxis zijn
    	const taxis = filterDataRows(filteredData, 'taxi_indicator' ,'Ja');
      console.log("filteren: data van alleen personenautos die wel taxis zijn", taxis);

      //transformeer personenautos naar alleen kleur 
      const personenautosTransformed = transformData(personenautos);
      console.log("data transformeren van de personenautos", personenautosTransformed);
      
      //transformeer taxis naar alleen kleur 
      const taxisTransformed = transformData(taxis);
      console.log("data transformeren van de taxis", taxisTransformed);
    
    	//array maken met alle kleuren van personenautos
      const colorsPersonenautos = filterColomn(personenautosTransformed, 'kleur');
      console.log("kleurenarray personenautos", colorsPersonenautos);
    
    	//array maken van alle kleuren van taxis
      const colorsTaxis = filterColomn(taxisTransformed, 'kleur');
      console.log("kleurenarray personenautos", colorsTaxis);
      
      //tellen hoeveel er van elke kleur zijn bij de personenautos
      const colorsOfPersonenautos = countColors(colorsPersonenautos);
      console.log("De kleuren tellen", colorsOfPersonenautos);
    
    	//tellen hoeveel er van elke kleur zijn bij de personenautos
      const colorsOfTaxis = countColors(colorsTaxis);
      console.log("De kleuren tellen", colorsOfTaxis);
      
      //Zet de kleuren van de personenautos die geteld zijn in een Array
      dataPersonenautos = newArray(colorsOfPersonenautos);
      console.log("alle kleuren van de personenautos in nieuwe array", dataPersonenautos);

      //Zet de kleuren van de taxis die geteld zijn in een Array
      dataTaxis = newArray(colorsOfTaxis);
      console.log("alle kleuren van de taxis in nieuwe array", dataTaxis);

    	render(dataTaxis);
      
  });
  	

  function transformData(data) {
      const transformedData = data.map(item => {
          return {
              kleur: item.eerste_kleur,
          }
      });
      return transformedData
  }

  // kleuren returnen in een array
  function countColors(data) {
      let countedColors = [];

      for (var i = 0; i < data.length; i++) {
          //https://stackoverflow.com/questions/15052702/count-unique-elements-in-array-without-sorting/15052738#15052738
          countedColors[data[i]] = 1 + (countedColors[data[i]] || 0);
      }
      return countedColors
  }

  // Geeft alle waardes van een specifieke kolom van de data in een array
  function filterColomn(data, column) {
      // door alle data heen gaan en alleen de geselecteerde kolom geven
      return data.map(item => item[column])
  }

  //https://stackoverflow.com/questions/36411566/how-to-transpose-a-javascript-object-into-a-key-value-array
  function newArray(dataArr) {
      return Object.entries(dataArr).map(([key, value]) => ({
          key,
          value
      }));
  }

  //functie waarbij ik filter op alle personenauto's
  function filterDataRows(dataArray, row, value) {
  	return dataArray.filter(item => item[row]=== value)
  }

}(d3));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFxuICBzZWxlY3QsXG4gIGNzdixcbiAgc2NhbGVMaW5lYXIsXG4gIG1heCxcbiAgc2NhbGVCYW5kLFxuICBheGlzTGVmdCxcbiAgYXhpc0JvdHRvbVxufSBmcm9tICdkMyc7XG5cblxuY29uc3QgZW5kcG9pbnQgPSAnaHR0cHM6Ly9vcGVuZGF0YS5yZHcubmwvcmVzb3VyY2UvbTlkNy1lYmYyLmpzb24/JGxpbWl0PTE1MDAwJ1xubGV0IGRhdGFQZXJzb25lbmF1dG9zO1xubGV0IGRhdGFUYXhpcztcblxuY29uc3Qgc3ZnID0gc2VsZWN0KCdzdmcnKTtcblxuY29uc3Qgd2lkdGggPSArc3ZnLmF0dHIoJ3dpZHRoJyk7XG5jb25zdCBoZWlnaHQgPSArc3ZnLmF0dHIoJ2hlaWdodCcpO1xuXG5jb25zdCB4U2NhbGUgPSBzY2FsZUxpbmVhcigpXG4gIFx0XG4gIFxuICBjb25zdCB5U2NhbGUgPSBzY2FsZUJhbmQoKVxuICBcdFxuXG5jb25zdCByZW5kZXIgPSBkYXRhID0+IHtcbiAgY29uc3QgeFZhbHVlID0gZCA9PiBkLnZhbHVlXG4gIGNvbnN0IHlWYWx1ZSA9IGQgPT4gZC5rZXlcbiAgY29uc3QgbWFyZ2luID0ge3RvcDogNTAsIHJpZ2h0OiA1MCwgYm90dG9tOiA1MCwgbGVmdDogMTAwfTtcbiAgY29uc3QgaW5uZXJXaWR0aCA9IHdpZHRoIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQ7XG4gIGNvbnN0IGlubmVySGVpZ2h0ID0gaGVpZ2h0IC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XG4gIGNvbnNvbGUubG9nKHhWYWx1ZSlcbiAgXG4gIHhTY2FsZS5kb21haW4oWzAsIG1heChkYXRhLCB4VmFsdWUpXSlcbiAgeFNjYWxlLnJhbmdlKFswLCBpbm5lcldpZHRoXSk7XG4gIFxuICB5U2NhbGUuZG9tYWluKGRhdGEubWFwKHlWYWx1ZSkpXG4gIHlTY2FsZS5yYW5nZShbMCwgaW5uZXJIZWlnaHRdKVxuICB5U2NhbGUucGFkZGluZygwLjEpO1xuICBcbiAgXG4gIGNvbnN0IGcgPSBzdmcuYXBwZW5kKCdnJylcbiAgXHQuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgke21hcmdpbi5sZWZ0fSwke21hcmdpbi50b3B9KWApO1xuICBcbiAgZy5hcHBlbmQoJ2cnKS5jYWxsKGF4aXNMZWZ0KHlTY2FsZSkpO1xuICBnLmFwcGVuZCgnZycpLmNhbGwoYXhpc0JvdHRvbSh4U2NhbGUpKVxuICBcdC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKDAsJHtpbm5lckhlaWdodH0pYCk7XG4gIFx0XG4gIFxuICBnLnNlbGVjdEFsbCgncmVjdCcpLmRhdGEoZGF0YSkgLy8gSGllciB6aWpuIG5vZyAwIHJlY3RhbmdsZXNcbiAgXHQuZW50ZXIoKS5hcHBlbmQoJ3JlY3QnKSAvLyBIaWVyIG1hYWt0IGhpaiB2b29yIGVsayBkYXRhcHVudCBlZW4gcmVjdGFuZ2xlIGFhblxuICBcdFx0LmF0dHIoJ3knLCBkID0+IHlTY2FsZSh5VmFsdWUoZCkpKVxuICAgIFx0LmF0dHIoJ3dpZHRoJywgZCA9PiB4U2NhbGUoeFZhbHVlKGQpKSlcbiAgXHRcdC5hdHRyKCdoZWlnaHQnLCB5U2NhbGUuYmFuZHdpZHRoKCkpO1xufTtcblxuXG5cbmQzLmpzb24oZW5kcG9pbnQpLnRoZW4oZGF0YSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJydXdlIGRhdGFcIiwgZGF0YSlcblxuICAgIC8vZmlsdGVyIHBlcnNvbmVuYXV0b1xuICAgIGxldCBmaWx0ZXJlZERhdGEgPSBmaWx0ZXJEYXRhUm93cyhkYXRhLCAndm9lcnR1aWdzb29ydCcgLCdQZXJzb25lbmF1dG8nKVxuICAgIGNvbnNvbGUubG9nKFwiZmlsdGVyZW46IGRhdGEgdmFuIGFsbGVlbiBwZXJzb25lbmF1dG9cIiwgZmlsdGVyZWREYXRhKVxuICBcbiAgXHQvL2ZpbHRlciBwZXJzb25lbmF1dG9zIGRpZSBnZWVuIHRheGlzIHppam5cbiAgXHRjb25zdCBwZXJzb25lbmF1dG9zID0gZmlsdGVyRGF0YVJvd3MoZmlsdGVyZWREYXRhLCAndGF4aV9pbmRpY2F0b3InICwnTmVlJylcbiAgICBjb25zb2xlLmxvZyhcImZpbHRlcmVuOiBkYXRhIHZhbiBhbGxlZW4gcGVyc29uZW5hdXRvcyBkaWUgZ2VlbiB0YXhpcyB6aWpuXCIsIHBlcnNvbmVuYXV0b3MpXG4gIFxuICBcdC8vZmlsdGVyIHBlcnNvbmVuYXV0b3MgZGllIHdlbCB0YXhpcyB6aWpuXG4gIFx0Y29uc3QgdGF4aXMgPSBmaWx0ZXJEYXRhUm93cyhmaWx0ZXJlZERhdGEsICd0YXhpX2luZGljYXRvcicgLCdKYScpXG4gICAgY29uc29sZS5sb2coXCJmaWx0ZXJlbjogZGF0YSB2YW4gYWxsZWVuIHBlcnNvbmVuYXV0b3MgZGllIHdlbCB0YXhpcyB6aWpuXCIsIHRheGlzKVxuXG4gICAgLy90cmFuc2Zvcm1lZXIgcGVyc29uZW5hdXRvcyBuYWFyIGFsbGVlbiBrbGV1ciBcbiAgICBjb25zdCBwZXJzb25lbmF1dG9zVHJhbnNmb3JtZWQgPSB0cmFuc2Zvcm1EYXRhKHBlcnNvbmVuYXV0b3MpXG4gICAgY29uc29sZS5sb2coXCJkYXRhIHRyYW5zZm9ybWVyZW4gdmFuIGRlIHBlcnNvbmVuYXV0b3NcIiwgcGVyc29uZW5hdXRvc1RyYW5zZm9ybWVkKVxuICAgIFxuICAgIC8vdHJhbnNmb3JtZWVyIHRheGlzIG5hYXIgYWxsZWVuIGtsZXVyIFxuICAgIGNvbnN0IHRheGlzVHJhbnNmb3JtZWQgPSB0cmFuc2Zvcm1EYXRhKHRheGlzKVxuICAgIGNvbnNvbGUubG9nKFwiZGF0YSB0cmFuc2Zvcm1lcmVuIHZhbiBkZSB0YXhpc1wiLCB0YXhpc1RyYW5zZm9ybWVkKVxuICBcbiAgXHQvL2FycmF5IG1ha2VuIG1ldCBhbGxlIGtsZXVyZW4gdmFuIHBlcnNvbmVuYXV0b3NcbiAgICBjb25zdCBjb2xvcnNQZXJzb25lbmF1dG9zID0gZmlsdGVyQ29sb21uKHBlcnNvbmVuYXV0b3NUcmFuc2Zvcm1lZCwgJ2tsZXVyJylcbiAgICBjb25zb2xlLmxvZyhcImtsZXVyZW5hcnJheSBwZXJzb25lbmF1dG9zXCIsIGNvbG9yc1BlcnNvbmVuYXV0b3MpXG4gIFxuICBcdC8vYXJyYXkgbWFrZW4gdmFuIGFsbGUga2xldXJlbiB2YW4gdGF4aXNcbiAgICBjb25zdCBjb2xvcnNUYXhpcyA9IGZpbHRlckNvbG9tbih0YXhpc1RyYW5zZm9ybWVkLCAna2xldXInKVxuICAgIGNvbnNvbGUubG9nKFwia2xldXJlbmFycmF5IHBlcnNvbmVuYXV0b3NcIiwgY29sb3JzVGF4aXMpXG4gICAgXG4gICAgLy90ZWxsZW4gaG9ldmVlbCBlciB2YW4gZWxrZSBrbGV1ciB6aWpuIGJpaiBkZSBwZXJzb25lbmF1dG9zXG4gICAgY29uc3QgY29sb3JzT2ZQZXJzb25lbmF1dG9zID0gY291bnRDb2xvcnMoY29sb3JzUGVyc29uZW5hdXRvcylcbiAgICBjb25zb2xlLmxvZyhcIkRlIGtsZXVyZW4gdGVsbGVuXCIsIGNvbG9yc09mUGVyc29uZW5hdXRvcylcbiAgXG4gIFx0Ly90ZWxsZW4gaG9ldmVlbCBlciB2YW4gZWxrZSBrbGV1ciB6aWpuIGJpaiBkZSBwZXJzb25lbmF1dG9zXG4gICAgY29uc3QgY29sb3JzT2ZUYXhpcyA9IGNvdW50Q29sb3JzKGNvbG9yc1RheGlzKVxuICAgIGNvbnNvbGUubG9nKFwiRGUga2xldXJlbiB0ZWxsZW5cIiwgY29sb3JzT2ZUYXhpcylcbiAgICBcbiAgICAvL1pldCBkZSBrbGV1cmVuIHZhbiBkZSBwZXJzb25lbmF1dG9zIGRpZSBnZXRlbGQgemlqbiBpbiBlZW4gQXJyYXlcbiAgICBkYXRhUGVyc29uZW5hdXRvcyA9IG5ld0FycmF5KGNvbG9yc09mUGVyc29uZW5hdXRvcylcbiAgICBjb25zb2xlLmxvZyhcImFsbGUga2xldXJlbiB2YW4gZGUgcGVyc29uZW5hdXRvcyBpbiBuaWV1d2UgYXJyYXlcIiwgZGF0YVBlcnNvbmVuYXV0b3MpXG5cbiAgICAvL1pldCBkZSBrbGV1cmVuIHZhbiBkZSB0YXhpcyBkaWUgZ2V0ZWxkIHppam4gaW4gZWVuIEFycmF5XG4gICAgZGF0YVRheGlzID0gbmV3QXJyYXkoY29sb3JzT2ZUYXhpcylcbiAgICBjb25zb2xlLmxvZyhcImFsbGUga2xldXJlbiB2YW4gZGUgdGF4aXMgaW4gbmlldXdlIGFycmF5XCIsIGRhdGFUYXhpcylcblxuICBcdHJlbmRlcihkYXRhVGF4aXMpXG4gICAgXG59KVxuXHRcblxuZnVuY3Rpb24gdHJhbnNmb3JtRGF0YShkYXRhKSB7XG4gICAgY29uc3QgdHJhbnNmb3JtZWREYXRhID0gZGF0YS5tYXAoaXRlbSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBrbGV1cjogaXRlbS5lZXJzdGVfa2xldXIsXG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiB0cmFuc2Zvcm1lZERhdGFcbn1cblxuLy8ga2xldXJlbiByZXR1cm5lbiBpbiBlZW4gYXJyYXlcbmZ1bmN0aW9uIGNvdW50Q29sb3JzKGRhdGEpIHtcbiAgICBsZXQgY291bnRlZENvbG9ycyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTUwNTI3MDIvY291bnQtdW5pcXVlLWVsZW1lbnRzLWluLWFycmF5LXdpdGhvdXQtc29ydGluZy8xNTA1MjczOCMxNTA1MjczOFxuICAgICAgICBjb3VudGVkQ29sb3JzW2RhdGFbaV1dID0gMSArIChjb3VudGVkQ29sb3JzW2RhdGFbaV1dIHx8IDApXG4gICAgfVxuICAgIHJldHVybiBjb3VudGVkQ29sb3JzXG59XG5cbi8vIEdlZWZ0IGFsbGUgd2FhcmRlcyB2YW4gZWVuIHNwZWNpZmlla2Uga29sb20gdmFuIGRlIGRhdGEgaW4gZWVuIGFycmF5XG5mdW5jdGlvbiBmaWx0ZXJDb2xvbW4oZGF0YSwgY29sdW1uKSB7XG4gICAgLy8gZG9vciBhbGxlIGRhdGEgaGVlbiBnYWFuIGVuIGFsbGVlbiBkZSBnZXNlbGVjdGVlcmRlIGtvbG9tIGdldmVuXG4gICAgcmV0dXJuIGRhdGEubWFwKGl0ZW0gPT4gaXRlbVtjb2x1bW5dKVxufVxuXG4vL2h0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM2NDExNTY2L2hvdy10by10cmFuc3Bvc2UtYS1qYXZhc2NyaXB0LW9iamVjdC1pbnRvLWEta2V5LXZhbHVlLWFycmF5XG5mdW5jdGlvbiBuZXdBcnJheShkYXRhQXJyKSB7XG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKGRhdGFBcnIpLm1hcCgoW2tleSwgdmFsdWVdKSA9PiAoe1xuICAgICAgICBrZXksXG4gICAgICAgIHZhbHVlXG4gICAgfSkpO1xufVxuXG4vLyBSZXR1cm50IGRlIHdhYXJkZXMgdmFuIGVlbiBiZXBhYWxkZSBrb2xvbSBlbiB6ZXQgZGl0IGluIGVlbiBhcnJheS5cbmZ1bmN0aW9uIGZpbHRlckRhdGEoZGF0YUFycmF5LCBjb2x1bW4pIHtcbiAgICAvLyBkb29yIGFsbGUgZGF0YSBoZWVuIGdhYW4gZW4gYWxsZWVuIGRlIGdlc2VsZWN0ZWVyZGUga29sb20gZ2V2ZW5cbiAgICByZXR1cm4gZGF0YUFycmF5Lm1hcChpdGVtID0+IGl0ZW1bY29sdW1uXSlcbn1cblxuLy9mdW5jdGllIHdhYXJiaWogaWsgZmlsdGVyIG9wIGFsbGUgcGVyc29uZW5hdXRvJ3NcbmZ1bmN0aW9uIGZpbHRlckRhdGFSb3dzKGRhdGFBcnJheSwgcm93LCB2YWx1ZSkge1xuXHRyZXR1cm4gZGF0YUFycmF5LmZpbHRlcihpdGVtID0+IGl0ZW1bcm93XT09PSB2YWx1ZSlcbn1cblxuXG5cblxuXG5cblxuIl0sIm5hbWVzIjpbInNlbGVjdCIsInNjYWxlTGluZWFyIiwic2NhbGVCYW5kIiwibWF4IiwiYXhpc0xlZnQiLCJheGlzQm90dG9tIl0sIm1hcHBpbmdzIjoiOzs7RUFXQSxNQUFNLFFBQVEsR0FBRywrREFBOEQ7RUFDL0UsSUFBSSxpQkFBaUIsQ0FBQztFQUN0QixJQUFJLFNBQVMs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QUcsRUFBRSxDQUFDO0FBQzNCO0VBQ0EsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUMxQztFQUNBLFFBQVEsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDO0VBQ2xFLEtBQUs7RUFDTCxJQUFJLE9BQU8sYUFBYTtFQUN4QixDQUFDO0FBQ0Q7RUFDQTtFQUNBLFNBQVMsWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUU7RUFDcEM7RUFDQSxJQUFJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBQ3pDLENBQUM7QUFDRDtFQUNBO0VBQ0EsU0FBUyxRQUFRLENBQUMsT0FBTyxFQUFFO0VBQzNCLElBQUksT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxNQUFNO0VBQzFELFFBQVEsR0FBRztFQUNYLFFBQVEsS0FBSztFQUNiLEtBQUssQ0FBQyxDQUFDLENBQUM7RUFDUixDQUFDO0FBT0Q7RUFDQTtFQUNBLFNBQVMsY0FBYyxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFO0VBQy9DLENBQUMsT0FBTyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDO0VBQ3BEOzs7OyJ9