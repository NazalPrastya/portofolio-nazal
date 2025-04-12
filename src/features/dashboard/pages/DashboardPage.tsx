import DashboardLayout from "~/components/layout/DashboardLayout"
import AreaCharts from "../charts/AreaChart"
import {  Hand, Inbox, Layers } from "lucide-react"
import CardTotal from "~/components/card-total"

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center">
          <Hand className="mr-2 h-6 w-6 text-violet-600" />
          <span>Welcome Back</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-lg shadow-sm overflow-hidden ">
              <AreaCharts />
          </div>

          <div className="flex flex-col gap-6 h-full">
            <CardTotal
              title="Projects"
              value={12}
              icon={Layers}
              color="violet"
              trend={{ value: 8, isPositive: true }}
            />
            <CardTotal
              title="Inbox"
              value={24}
              icon={Inbox}
              color="blue"
              trend={{ value: 12, isPositive: true }}
            />
           
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
