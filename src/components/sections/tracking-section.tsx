import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, CheckCircle, Package, Truck, MapPin, XCircle, Clock, Home, AlertCircle } from "lucide-react"
import { useTrackParcelQuery } from "@/redux/features/parcel/parcel.api"

interface StatusLog {
  status: string
  timestamp: string
  location?: string
  note?: string
}

interface ParcelData {
  _id: string
  trackingId: string
  type: string
  weight: number
  fee: number
  currentStatus: string
  deliveryLocation: string
  deliveryAddress: string
  deliveryDate: string
  statusLogs: StatusLog[]
  sender: string
  receiver: string
  isBlocked: boolean
  isCancelled: boolean
}

const statusIconMap: { [key: string]: any } = {
  "Order Placed": CheckCircle,
  "Pickup Scheduled": Package,
  "In Transit": Truck,
  "Out for Delivery": MapPin,
  "Delivered": Home,
  "Cancelled": XCircle,
  "Blocked": AlertCircle,
}

export default function TrackingSection() {
  const [inputValue, setInputValue] = useState("")
  const [searchTrigger, setSearchTrigger] = useState("")

  // RTK Query - only fetch when searchTrigger has value
  const { data, isLoading, error } = useTrackParcelQuery(searchTrigger, {
    skip: !searchTrigger,
  })

  const parcelData: ParcelData | undefined = data?.data

  const handleSearch = () => {
    if (inputValue.trim()) {
      setSearchTrigger(inputValue.trim())
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const getStatusIcon = (status: string) => {
    return statusIconMap[status] || Package
  }

  return (
    <div className="container mt-16 pb-8 mx-auto px-4">
      <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Track Your Parcel</h2>
        </div>
      <div className="max-w-4xl mx-auto">
        {/* Tracking Input */}
        <Card className="p-8  shadow-md">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Enter tracking Id (trackId_1766661536967_587)"
                className="w-full pl-4 pr-12 py-3 border-2 border-gray-200"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search className="w-5 h-5" />
              </button>
            </div>
            <Button
              onClick={handleSearch}
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8"
            >
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </div>

          {/* {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              <p className="font-semibold">Parcel not found</p>
              <p className="text-sm">Please check your tracking number and try again.</p>
            </div>
          )} */}

          {/* Parcel Info */}
          {parcelData && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-gray-600">Tracking ID:</span>
                <span className="text-sm font-bold text-gray-900">{parcelData.trackingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-gray-600">Type:</span>
                <span className="text-sm text-gray-900">{parcelData.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-gray-600">Current Status:</span>
                <span className="text-sm font-bold text-green-600">{parcelData.currentStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-gray-600">Delivery Location:</span>
                <span className="text-sm text-gray-900">{parcelData.deliveryLocation}</span>
              </div>
              {parcelData.isBlocked && (
                <div className="bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded mt-2">
                  <p className="text-sm font-semibold">⚠️ This parcel is blocked</p>
                </div>
              )}
              {parcelData.isCancelled && (
                <div className="bg-yellow-100 border border-yellow-300 text-yellow-700 px-3 py-2 rounded mt-2">
                  <p className="text-sm font-semibold">❌ This parcel has been cancelled</p>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Status Timeline */}
        {parcelData && parcelData.statusLogs && parcelData.statusLogs.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">
              Your Parcel Journey
            </h3>
            <div className="space-y-4">
              {parcelData.statusLogs.map((log, idx) => {
                const Icon = getStatusIcon(log.status)
                return (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-500 text-white">
                        <Icon className="w-6 h-6" />
                      </div>
                      {idx < parcelData.statusLogs.length - 1 && (
                        <div className="w-1 h-12 bg-gray-200 mt-2" />
                      )}
                    </div>
                    <div className="pt-2 flex-1">
                      <h4 className="font-semibold text-gray-900">
                        {log.status}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {new Date(log.timestamp).toLocaleString()}
                      </p>
                      {log.location && (
                        <p className="text-sm text-gray-500 mt-1">
                          📍 {log.location}
                        </p>
                      )}
                      {log.note && (
                        <p className="text-sm text-gray-500 mt-1 italic">
                          {log.note}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* No Data Message */}
        {!parcelData && searchTrigger && !isLoading && !error && (
          <div className="text-center py-12 text-gray-500">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>No tracking information available</p>
          </div>
        )}
      </div>
    </div>
  )
}