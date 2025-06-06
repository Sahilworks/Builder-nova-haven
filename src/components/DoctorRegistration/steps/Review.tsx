import React, { useState } from "react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent as CardContentInner,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Stethoscope,
  Clock,
  IndianRupee,
  CheckCircle,
  AlertCircle,
  Building,
  Calendar,
  Award,
  FileText,
  CreditCard,
} from "lucide-react";
import { DoctorFormData } from "../MultiStepForm";

interface ReviewProps {
  formData: DoctorFormData;
  updateFormData: (data: Partial<DoctorFormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const Review: React.FC<ReviewProps> = ({ formData, onPrevious }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert(
      "Registration submitted successfully! You will receive a confirmation email shortly.",
    );
    setIsSubmitting(false);
  };

  const formatAvailability = (availability: any) => {
    if (!availability || Object.keys(availability).length === 0) {
      return "Not set";
    }

    const workingDays = Object.entries(availability)
      .filter(
        ([_, dayData]: [string, any]) =>
          dayData.isWorking || dayData.isAvailable,
      )
      .map(([day, dayData]: [string, any]) => {
        const hours = dayData.workHours || dayData.hours;
        return `${day}: ${hours.start} - ${hours.end}`;
      });

    return workingDays.length > 0
      ? workingDays.join(", ")
      : "No working days set";
  };

  const paymentMethodNames = {
    gpay: "Google Pay",
    paytm: "Paytm",
    phonepe: "PhonePe",
    netbanking: "Net Banking",
    upi: "UPI",
  };

  return (
    <>
      <CardContent className="p-8">
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-doctor-text mb-2">
              Review Your Registration
            </h2>
            <p className="text-gray-600">
              Please review all your information before submitting your
              registration
            </p>
          </div>

          {/* Doctor Profile Overview */}
          <Card className="border-doctor-primary/20">
            <CardHeader className="bg-gradient-to-r from-doctor-primary/5 to-doctor-blue/5">
              <CardTitle className="flex items-center space-x-3">
                <Avatar className="w-16 h-16">
                  {formData.profilePicture ? (
                    <AvatarImage
                      src={URL.createObjectURL(formData.profilePicture)}
                    />
                  ) : (
                    <AvatarFallback className="bg-doctor-primary text-white text-lg">
                      {formData.firstName?.[0]}
                      {formData.lastName?.[0]}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold text-doctor-text">
                    Dr. {formData.firstName} {formData.lastName}
                  </h3>
                  <p className="text-doctor-primary font-medium">
                    {formData.speciality}
                  </p>
                  {formData.isMobileVerified && (
                    <Badge className="bg-green-600 mt-1">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-doctor-primary" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContentInner className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">First Name</p>
                    <p className="font-medium">{formData.firstName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Last Name</p>
                    <p className="font-medium">{formData.lastName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Date of Birth</p>
                    <p className="font-medium">{formData.dateOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Mobile</p>
                    <p className="font-medium">{formData.mobileNumber}</p>
                  </div>
                </div>

                <div>
                  <p className="text-gray-500 text-sm mb-2">Languages</p>
                  <div className="flex flex-wrap gap-1">
                    {formData.languages.map((lang, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                {formData.awards.length > 0 && (
                  <div>
                    <p className="text-gray-500 text-sm mb-2">Awards</p>
                    <div className="space-y-1">
                      {formData.awards.map((award, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Award className="w-3 h-3 text-yellow-500" />
                          <span className="text-sm">{award}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContentInner>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-doctor-primary" />
                  <span>Contact Information</span>
                </CardTitle>
              </CardHeader>
              <CardContentInner className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{formData.phoneNumber}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{formData.email}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-gray-500 text-sm mb-2">
                    Clinics ({formData.clinics.length})
                  </p>
                  <div className="space-y-2">
                    {formData.clinics.map((clinic, index) => (
                      <div
                        key={clinic.id}
                        className="flex items-start space-x-2"
                      >
                        <Building className="w-4 h-4 text-doctor-primary mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">{clinic.name}</p>
                          <p className="text-xs text-gray-500">
                            {clinic.address}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContentInner>
            </Card>

            {/* Education & Qualification */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="w-5 h-5 text-doctor-primary" />
                  <span>Education & Qualification</span>
                </CardTitle>
              </CardHeader>
              <CardContentInner className="space-y-4">
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500">Highest Degree</p>
                    <p className="font-medium">{formData.highestDegree}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">University/Institute</p>
                    <p className="font-medium">{formData.university}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Medical License No.</p>
                    <p className="font-medium">
                      {formData.medicalLicenseNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Issuing Authority</p>
                    <p className="font-medium">{formData.issuingAuthority}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">License Expiry</p>
                    <p className="font-medium">{formData.licenseExpiryDate}</p>
                  </div>
                </div>

                {formData.licenseDocument && (
                  <div className="flex items-center space-x-2 p-2 bg-green-50 rounded">
                    <FileText className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-800">
                      License document uploaded
                    </span>
                  </div>
                )}
              </CardContentInner>
            </Card>

            {/* Specialization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Stethoscope className="w-5 h-5 text-doctor-primary" />
                  <span>Specialization</span>
                </CardTitle>
              </CardHeader>
              <CardContentInner className="space-y-4">
                <div>
                  <p className="text-gray-500 text-sm">Primary Speciality</p>
                  <Badge className="bg-doctor-primary mt-1">
                    {formData.speciality}
                  </Badge>
                </div>

                <div>
                  <p className="text-gray-500 text-sm mb-2">Services Offered</p>
                  <div className="flex flex-wrap gap-1">
                    {[...formData.services, ...formData.customServices].map(
                      (service, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {service}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
              </CardContentInner>
            </Card>

            {/* Charges & Payment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <IndianRupee className="w-5 h-5 text-doctor-primary" />
                  <span>Charges & Payment</span>
                </CardTitle>
              </CardHeader>
              <CardContentInner className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Clinic Visit</p>
                    <p className="font-medium">
                      ₹{formData.clinicVisitCharges}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Online Consultation</p>
                    <p className="font-medium">
                      ₹{formData.onlineConsultationCharges}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-gray-500 text-sm mb-2">Payment Methods</p>
                  <div className="flex flex-wrap gap-1">
                    {formData.paymentMethods.map((method) => (
                      <Badge
                        key={method}
                        variant="secondary"
                        className="text-xs"
                      >
                        {
                          paymentMethodNames[
                            method as keyof typeof paymentMethodNames
                          ]
                        }
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContentInner>
            </Card>

            {/* Availability Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-doctor-primary" />
                  <span>Availability Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContentInner className="space-y-4">
                <div>
                  <p className="text-gray-500 text-sm mb-2">
                    Clinic Availability
                  </p>
                  <div className="text-xs space-y-1">
                    {Object.entries(formData.clinicAvailability).map(
                      ([clinicId, data]) => {
                        const clinic = formData.clinics.find(
                          (c) => c.id === clinicId,
                        );
                        const workingDays = Object.keys(data.days || {}).filter(
                          (day) => data.days?.[day]?.isWorking,
                        ).length;

                        return (
                          <div key={clinicId}>
                            <p className="font-medium">
                              {clinic?.name}: {workingDays} days/week
                            </p>
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-gray-500 text-sm mb-2">
                    Online Consultation
                  </p>
                  <p className="text-xs">
                    {
                      Object.values(formData.onlineConsultationHours).filter(
                        (day) => day.isAvailable,
                      ).length
                    }{" "}
                    days/week
                  </p>
                </div>
              </CardContentInner>
            </Card>
          </div>

          {/* Bio Section */}
          <Card>
            <CardHeader>
              <CardTitle>Bio/Description</CardTitle>
            </CardHeader>
            <CardContentInner>
              <p className="text-sm text-gray-700 leading-relaxed">
                {formData.bio}
              </p>
            </CardContentInner>
          </Card>

          {/* Final Notice */}
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContentInner className="p-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800 mb-2">
                    Before You Submit
                  </h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>
                      • Please ensure all information provided is accurate and
                      up-to-date
                    </li>
                    <li>
                      • Your registration will be reviewed by our team within
                      2-3 business days
                    </li>
                    <li>
                      • You will receive email notifications about your
                      registration status
                    </li>
                    <li>
                      • Any false information may result in rejection of your
                      application
                    </li>
                  </ul>
                </div>
              </div>
            </CardContentInner>
          </Card>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between p-8 bg-gray-50">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          disabled={isSubmitting}
          className="border-gray-300"
        >
          Previous
        </Button>

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-doctor-primary hover:bg-doctor-primary/90 px-8"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Submitting...
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Submit Registration
            </>
          )}
        </Button>
      </CardFooter>
    </>
  );
};

export default Review;
