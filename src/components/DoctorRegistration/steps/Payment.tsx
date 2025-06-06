import React from "react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  IndianRupee,
  CreditCard,
  Smartphone,
  Wallet,
  Building,
} from "lucide-react";
import { DoctorFormData } from "../MultiStepForm";
import { cn } from "@/lib/utils";

interface PaymentProps {
  formData: DoctorFormData;
  updateFormData: (data: Partial<DoctorFormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const paymentMethods = [
  {
    id: "gpay",
    name: "Google Pay",
    icon: <Smartphone className="w-5 h-5" />,
    color: "text-green-600",
    bgColor: "bg-green-50 border-green-200",
  },
  {
    id: "paytm",
    name: "Paytm",
    icon: <Wallet className="w-5 h-5" />,
    color: "text-blue-600",
    bgColor: "bg-blue-50 border-blue-200",
  },
  {
    id: "phonepe",
    name: "PhonePe",
    icon: <CreditCard className="w-5 h-5" />,
    color: "text-purple-600",
    bgColor: "bg-purple-50 border-purple-200",
  },
  {
    id: "netbanking",
    name: "Net Banking",
    icon: <Building className="w-5 h-5" />,
    color: "text-orange-600",
    bgColor: "bg-orange-50 border-orange-200",
  },
  {
    id: "upi",
    name: "UPI",
    icon: <Smartphone className="w-5 h-5" />,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50 border-indigo-200",
  },
];

const Payment: React.FC<PaymentProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrevious,
}) => {
  const handlePaymentMethodToggle = (methodId: string) => {
    const updatedMethods = formData.paymentMethods.includes(methodId)
      ? formData.paymentMethods.filter((method) => method !== methodId)
      : [...formData.paymentMethods, methodId];
    updateFormData({ paymentMethods: updatedMethods });
  };

  const isFormValid = () => {
    return (
      formData.clinicVisitCharges > 0 &&
      formData.onlineConsultationCharges > 0 &&
      formData.paymentMethods.length > 0
    );
  };

  return (
    <>
      <CardContent className="p-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-doctor-text mb-6">
              Charges & Payment Information
            </h2>

            {/* Charges Section */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg text-doctor-text flex items-center">
                  <IndianRupee className="w-5 h-5 mr-2 text-doctor-primary" />
                  Consultation Charges (in Rupees)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Clinic Visit Charges */}
                  <div className="space-y-2">
                    <Label htmlFor="clinicVisitCharges">
                      Clinic Visit Charges *
                    </Label>
                    <div className="relative">
                      <IndianRupee className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                      <Input
                        id="clinicVisitCharges"
                        type="number"
                        min="0"
                        value={formData.clinicVisitCharges || ""}
                        onChange={(e) =>
                          updateFormData({
                            clinicVisitCharges: Number(e.target.value),
                          })
                        }
                        placeholder="Enter clinic visit charges"
                        className="pl-10 focus:ring-doctor-primary focus:border-doctor-primary"
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      Charges for in-person consultation at your clinic
                    </p>
                  </div>

                  {/* Online Consultation Charges */}
                  <div className="space-y-2">
                    <Label htmlFor="onlineConsultationCharges">
                      Online Consultation Charges *
                    </Label>
                    <div className="relative">
                      <IndianRupee className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                      <Input
                        id="onlineConsultationCharges"
                        type="number"
                        min="0"
                        value={formData.onlineConsultationCharges || ""}
                        onChange={(e) =>
                          updateFormData({
                            onlineConsultationCharges: Number(e.target.value),
                          })
                        }
                        placeholder="Enter online consultation charges"
                        className="pl-10 focus:ring-doctor-primary focus:border-doctor-primary"
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      Charges for virtual consultation via video call
                    </p>
                  </div>
                </div>

                {/* Charges Preview */}
                {(formData.clinicVisitCharges > 0 ||
                  formData.onlineConsultationCharges > 0) && (
                  <div className="mt-6 p-4 bg-doctor-primary/5 border border-doctor-primary/20 rounded-lg">
                    <h4 className="font-medium text-doctor-text mb-2">
                      Charges Summary
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      {formData.clinicVisitCharges > 0 && (
                        <div className="flex justify-between">
                          <span>Clinic Visit:</span>
                          <span className="font-medium">
                            ₹{formData.clinicVisitCharges}
                          </span>
                        </div>
                      )}
                      {formData.onlineConsultationCharges > 0 && (
                        <div className="flex justify-between">
                          <span>Online Consultation:</span>
                          <span className="font-medium">
                            ₹{formData.onlineConsultationCharges}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Methods Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-doctor-text">
                  Payment Methods Accepted *
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Select all payment methods you accept from patients
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {paymentMethods.map((method) => {
                    const isSelected = formData.paymentMethods.includes(
                      method.id,
                    );

                    return (
                      <div
                        key={method.id}
                        onClick={() => handlePaymentMethodToggle(method.id)}
                        className={cn(
                          "p-4 border rounded-lg cursor-pointer transition-all duration-200",
                          isSelected
                            ? `${method.bgColor} border-current ${method.color} shadow-sm`
                            : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm",
                        )}
                      >
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={isSelected}
                            onChange={() =>
                              handlePaymentMethodToggle(method.id)
                            }
                            className="pointer-events-none"
                          />
                          <div className={cn("flex-shrink-0", method.color)}>
                            {method.icon}
                          </div>
                          <div className="flex-1">
                            <p
                              className={cn(
                                "font-medium text-sm",
                                isSelected ? method.color : "text-gray-700",
                              )}
                            >
                              {method.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Selected Payment Methods Summary */}
                {formData.paymentMethods.length > 0 && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">
                      Selected Payment Methods ({formData.paymentMethods.length}
                      )
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {formData.paymentMethods.map((methodId) => {
                        const method = paymentMethods.find(
                          (m) => m.id === methodId,
                        );
                        return method ? (
                          <div
                            key={methodId}
                            className="flex items-center space-x-2 bg-white px-3 py-1 rounded-full border border-green-300"
                          >
                            <div className={method.color}>{method.icon}</div>
                            <span className="text-sm font-medium text-green-800">
                              {method.name}
                            </span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                {formData.paymentMethods.length === 0 && (
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      Please select at least one payment method to continue
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
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

export default Payment;
