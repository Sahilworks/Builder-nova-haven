import React, { useState } from "react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Clock, Coffee } from "lucide-react";
import { DoctorFormData } from "../MultiStepForm";
import { cn } from "@/lib/utils";

interface AvailabilityProps {
  formData: DoctorFormData;
  updateFormData: (data: Partial<DoctorFormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
];

const Availability: React.FC<AvailabilityProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrevious,
}) => {
  const [selectedClinic, setSelectedClinic] = useState<string>(
    formData.clinics[0]?.id || "",
  );

  const updateClinicAvailability = (
    clinicId: string,
    day: string,
    field: string,
    value: any,
  ) => {
    const updatedAvailability = {
      ...formData.clinicAvailability,
      [clinicId]: {
        ...formData.clinicAvailability[clinicId],
        days: {
          ...formData.clinicAvailability[clinicId]?.days,
          [day]: {
            ...formData.clinicAvailability[clinicId]?.days?.[day],
            [field]: value,
          },
        },
      },
    };
    updateFormData({ clinicAvailability: updatedAvailability });
  };

  const updateOnlineAvailability = (day: string, field: string, value: any) => {
    const updatedAvailability = {
      ...formData.onlineConsultationHours,
      [day]: {
        ...formData.onlineConsultationHours[day],
        [field]: value,
      },
    };
    updateFormData({ onlineConsultationHours: updatedAvailability });
  };

  const getClinicDayAvailability = (clinicId: string, day: string) => {
    return (
      formData.clinicAvailability[clinicId]?.days?.[day] || {
        isWorking: false,
        workHours: { start: "09:00", end: "17:00" },
        breakTime: { start: "13:00", end: "14:00" },
      }
    );
  };

  const getOnlineDayAvailability = (day: string) => {
    return (
      formData.onlineConsultationHours[day] || {
        isAvailable: false,
        hours: { start: "09:00", end: "17:00" },
        breakTime: { start: "13:00", end: "14:00" },
      }
    );
  };

  const isFormValid = () => {
    // Check if at least one clinic has at least one working day
    const hasClinicAvailability = Object.values(
      formData.clinicAvailability,
    ).some((clinic) =>
      Object.values(clinic.days || {}).some((day) => day.isWorking),
    );

    // Check if online consultation has at least one available day
    const hasOnlineAvailability = Object.values(
      formData.onlineConsultationHours,
    ).some((day) => day.isAvailable);

    return hasClinicAvailability || hasOnlineAvailability;
  };

  return (
    <>
      <CardContent className="p-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-doctor-text mb-6">
              Availability Schedule
            </h2>

            <Tabs defaultValue="clinic" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="clinic">Clinic Availability</TabsTrigger>
                <TabsTrigger value="online">Online Consultation</TabsTrigger>
              </TabsList>

              {/* Clinic Availability */}
              <TabsContent value="clinic" className="mt-6">
                <div className="space-y-6">
                  {/* Clinic Selection */}
                  <div className="flex items-center space-x-4">
                    <Building className="w-5 h-5 text-doctor-primary" />
                    <div className="flex-1">
                      <Label>Select Clinic</Label>
                      <Select
                        value={selectedClinic}
                        onValueChange={setSelectedClinic}
                      >
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Choose a clinic" />
                        </SelectTrigger>
                        <SelectContent>
                          {formData.clinics.map((clinic) => (
                            <SelectItem key={clinic.id} value={clinic.id}>
                              {clinic.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {selectedClinic && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg text-doctor-text">
                          {
                            formData.clinics.find(
                              (c) => c.id === selectedClinic,
                            )?.name
                          }{" "}
                          - Weekly Schedule
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {daysOfWeek.map((day) => {
                          const dayAvailability = getClinicDayAvailability(
                            selectedClinic,
                            day,
                          );

                          return (
                            <div key={day} className="border rounded-lg p-4">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                  <Switch
                                    checked={dayAvailability.isWorking}
                                    onCheckedChange={(checked) =>
                                      updateClinicAvailability(
                                        selectedClinic,
                                        day,
                                        "isWorking",
                                        checked,
                                      )
                                    }
                                  />
                                  <Label className="text-sm font-medium">
                                    {day}
                                  </Label>
                                </div>
                                {dayAvailability.isWorking && (
                                  <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                                    Available
                                  </span>
                                )}
                              </div>

                              {dayAvailability.isWorking && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                                  {/* Work Hours */}
                                  <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                      <Clock className="w-4 h-4 text-doctor-primary" />
                                      <Label className="text-sm">
                                        Work Hours
                                      </Label>
                                    </div>
                                    <div className="flex space-x-2">
                                      <Select
                                        value={dayAvailability.workHours.start}
                                        onValueChange={(value) =>
                                          updateClinicAvailability(
                                            selectedClinic,
                                            day,
                                            "workHours",
                                            {
                                              ...dayAvailability.workHours,
                                              start: value,
                                            },
                                          )
                                        }
                                      >
                                        <SelectTrigger className="w-full">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {timeSlots.map((time) => (
                                            <SelectItem key={time} value={time}>
                                              {time}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                      <span className="flex items-center text-sm text-gray-500">
                                        to
                                      </span>
                                      <Select
                                        value={dayAvailability.workHours.end}
                                        onValueChange={(value) =>
                                          updateClinicAvailability(
                                            selectedClinic,
                                            day,
                                            "workHours",
                                            {
                                              ...dayAvailability.workHours,
                                              end: value,
                                            },
                                          )
                                        }
                                      >
                                        <SelectTrigger className="w-full">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {timeSlots.map((time) => (
                                            <SelectItem key={time} value={time}>
                                              {time}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>

                                  {/* Break Time */}
                                  <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                      <Coffee className="w-4 h-4 text-doctor-primary" />
                                      <Label className="text-sm">
                                        Break Time
                                      </Label>
                                    </div>
                                    <div className="flex space-x-2">
                                      <Select
                                        value={dayAvailability.breakTime.start}
                                        onValueChange={(value) =>
                                          updateClinicAvailability(
                                            selectedClinic,
                                            day,
                                            "breakTime",
                                            {
                                              ...dayAvailability.breakTime,
                                              start: value,
                                            },
                                          )
                                        }
                                      >
                                        <SelectTrigger className="w-full">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {timeSlots.map((time) => (
                                            <SelectItem key={time} value={time}>
                                              {time}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                      <span className="flex items-center text-sm text-gray-500">
                                        to
                                      </span>
                                      <Select
                                        value={dayAvailability.breakTime.end}
                                        onValueChange={(value) =>
                                          updateClinicAvailability(
                                            selectedClinic,
                                            day,
                                            "breakTime",
                                            {
                                              ...dayAvailability.breakTime,
                                              end: value,
                                            },
                                          )
                                        }
                                      >
                                        <SelectTrigger className="w-full">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {timeSlots.map((time) => (
                                            <SelectItem key={time} value={time}>
                                              {time}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              {/* Online Consultation */}
              <TabsContent value="online" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-doctor-text">
                      Online Consultation Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {daysOfWeek.map((day) => {
                      const dayAvailability = getOnlineDayAvailability(day);

                      return (
                        <div key={day} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <Switch
                                checked={dayAvailability.isAvailable}
                                onCheckedChange={(checked) =>
                                  updateOnlineAvailability(
                                    day,
                                    "isAvailable",
                                    checked,
                                  )
                                }
                              />
                              <Label className="text-sm font-medium">
                                {day}
                              </Label>
                            </div>
                            {dayAvailability.isAvailable && (
                              <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                Online Available
                              </span>
                            )}
                          </div>

                          {dayAvailability.isAvailable && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                              {/* Online Hours */}
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <Clock className="w-4 h-4 text-doctor-blue" />
                                  <Label className="text-sm">
                                    Online Hours
                                  </Label>
                                </div>
                                <div className="flex space-x-2">
                                  <Select
                                    value={dayAvailability.hours.start}
                                    onValueChange={(value) =>
                                      updateOnlineAvailability(day, "hours", {
                                        ...dayAvailability.hours,
                                        start: value,
                                      })
                                    }
                                  >
                                    <SelectTrigger className="w-full">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {timeSlots.map((time) => (
                                        <SelectItem key={time} value={time}>
                                          {time}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <span className="flex items-center text-sm text-gray-500">
                                    to
                                  </span>
                                  <Select
                                    value={dayAvailability.hours.end}
                                    onValueChange={(value) =>
                                      updateOnlineAvailability(day, "hours", {
                                        ...dayAvailability.hours,
                                        end: value,
                                      })
                                    }
                                  >
                                    <SelectTrigger className="w-full">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {timeSlots.map((time) => (
                                        <SelectItem key={time} value={time}>
                                          {time}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              {/* Break Time */}
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <Coffee className="w-4 h-4 text-doctor-blue" />
                                  <Label className="text-sm">Break Time</Label>
                                </div>
                                <div className="flex space-x-2">
                                  <Select
                                    value={dayAvailability.breakTime.start}
                                    onValueChange={(value) =>
                                      updateOnlineAvailability(
                                        day,
                                        "breakTime",
                                        {
                                          ...dayAvailability.breakTime,
                                          start: value,
                                        },
                                      )
                                    }
                                  >
                                    <SelectTrigger className="w-full">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {timeSlots.map((time) => (
                                        <SelectItem key={time} value={time}>
                                          {time}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <span className="flex items-center text-sm text-gray-500">
                                    to
                                  </span>
                                  <Select
                                    value={dayAvailability.breakTime.end}
                                    onValueChange={(value) =>
                                      updateOnlineAvailability(
                                        day,
                                        "breakTime",
                                        {
                                          ...dayAvailability.breakTime,
                                          end: value,
                                        },
                                      )
                                    }
                                  >
                                    <SelectTrigger className="w-full">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {timeSlots.map((time) => (
                                        <SelectItem key={time} value={time}>
                                          {time}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between p-8 bg-gray-50">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          className="border-gray-300"
        >
          Previous
        </Button>

        <Button
          type="button"
          onClick={onNext}
          disabled={!isFormValid()}
          className="bg-doctor-primary hover:bg-doctor-primary/90 px-8"
        >
          Next Step
        </Button>
      </CardFooter>
    </>
  );
};

export default Availability;
