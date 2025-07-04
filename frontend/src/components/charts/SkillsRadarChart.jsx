// components/charts/SkillsRadarChart.jsx - Skills Radar Chart Component
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar, ResponsiveContainer, Legend
} from "recharts";

const SkillsRadarChart = ({ skillsData }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Skills Assessment
      </h2>
      {skillsData.length > 0 ? (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius={90} data={skillsData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Skills"
                dataKey="A"
                stroke="#EC4899"
                fill="#EC4899"
                fillOpacity={0.5}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-72 flex items-center justify-center text-gray-500">
          No skills data available yet
        </div>
      )}
    </div>
  );
};

export default SkillsRadarChart;