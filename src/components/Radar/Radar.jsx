import React, { useEffect, useRef, useState } from 'react';
import RadarDiagram from 'radar-diagram';
import './radar.css';
import { TweenMax } from 'gsap';

const padding = 50;
const Radar = ({ options, segments, rings, elements }) => {
  let svgRef = useRef(null);
  const [radarDiagram, setRadarDiagram] = useState(
    new RadarDiagram(options, { elements, rings, segments })
  );

  const containerHeight = () => {
    switch (options.totalAngle) {
      case Math.PI:
        return '50vw';
      default:
        return '95vw';
    }
  };

  useEffect(() => {
    setRadarDiagram(new RadarDiagram(options, { elements, rings, segments }));
  }, [options, segments, rings, elements]);

  useEffect(() => {
    if (options) {
      let vb;
      switch (options.totalAngle) {
        case Math.PI:
          vb = `${-padding} ${-padding} ${
            radarDiagram.options.baseDimension + 2 * padding
          } ${radarDiagram.options.baseDimension / 2 + padding}`;
          break;
        case Math.PI * 2:
          vb = `${-padding} ${-padding} ${
            radarDiagram.options.baseDimension + 2 * padding
          } ${radarDiagram.options.baseDimension + 2 * padding}`;
          break;
        case Math.PI / 2:
          vb = `${radarDiagram.options.baseDimension / 2} ${-padding} ${
            (radarDiagram.options.baseDimension + 2 * padding) / 2
          } ${(radarDiagram.options.baseDimension + 2 * padding) / 2}`;
          break;
        default:
          break;
      }
      TweenMax.to(svgRef, 1, { attr: { viewBox: vb } });
    }
  }, [options, radarDiagram.options.baseDimension]);

  return (
    <div className="radar-container" style={{ height: containerHeight() }}>
      <svg
        id="radar-plot"
        viewBox={`${-padding} ${-padding} ${
          radarDiagram.options.baseDimension + 2 * padding
        } ${radarDiagram.options.baseDimension + 2 * padding}`}
        xmlns="http://www.w3.org/2000/svg"
        ref={(el) => (svgRef = el)}
      >
        <circle
          r={radarDiagram.options.baseDimension / 2}
          cx={radarDiagram.options.baseDimension / 2}
          cy={radarDiagram.options.baseDimension / 2}
          fill="#ddd"
        ></circle>
        <line
          x1={radarDiagram.options.baseDimension / 2}
          y1="0"
          x2={radarDiagram.options.baseDimension / 2}
          y2={radarDiagram.options.baseDimension}
          stroke="#ddd"
        />
        <line
          x1="0"
          y1="499"
          x2={radarDiagram.options.baseDimension}
          y2={radarDiagram.options.baseDimension / 2}
          stroke="#000"
        />
        {radarDiagram.ringAxes.map((ringAxis) => (
          <circle
            className="radar__ring"
            key={ringAxis.slug}
            cx={radarDiagram.options.baseDimension / 2}
            cy={radarDiagram.options.baseDimension / 2}
            r={ringAxis.j}
            stroke="#aaa"
            strokeWidth={1}
            fill="#fff"
            fillOpacity={0.3}
          ></circle>
        ))}
        {radarDiagram.segmentAxes.map((segAxis, idx) => (
          <g key={segAxis.slug}>
            <line
              className="radar__segment-axis"
              x1={segAxis.axis.x1}
              x2={segAxis.axis.x2}
              y1={segAxis.axis.y1}
              y2={segAxis.axis.y2}
              stroke={'#aaa'}
              strokeWidth={1}
            ></line>

            <path
              className="radar__segment__path"
              id={'label-path-' + segAxis.slug}
              d={radarDiagram.getSegmentLabelPathBase()}
              fill={'none'}
              stroke={segAxis.color}
              strokeWidth={15}
              style={{
                transform: `rotate(${
                  (-idx * radarDiagram.options.totalAngle) /
                  radarDiagram.segments.length
                }rad)`,
              }}
            ></path>

            <text>
              <textPath
                href={`#label-path-${segAxis.slug}`}
                fill={'#555'}
                fontWeight={'800'}
                fontSize={`${radarDiagram.options.totalAngle / 3 + 0.5}em`}
                fontFamily={'Sans-serif'}
                stroke={segAxis.color}
                strokeWidth={1}
                startOffset={'50%'}
                textAnchor={'middle'}
              >
                {segAxis.label}
              </textPath>
            </text>
          </g>
        ))}
        {radarDiagram.dots.map((dot) => (
          <g
            key={dot.label}
            className="radar__dot"
            style={{ transform: `translate(${dot.x}px, ${dot.y}px)` }}
          >
            <circle
              r={dot.r}
              stroke={'#aaa'}
              strokeWidth={1}
              fill={dot.color}
            ></circle>
            <text className="radar__dot__label">{dot.label.substr(0, 5)}</text>
          </g>
        ))}
      </svg>
    </div>
  );
};

Radar.propTypes = {};

export default Radar;
