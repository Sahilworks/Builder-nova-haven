import React from "react";
import { CheckCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
}

interface StepSidebarProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepNumber: number) => void;
}

const StepSidebar: React.FC<StepSidebarProps> = ({
  steps,
  currentStep,
  onStepClick,
}) => {
  return (
    <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl border-r border-gray-200 z-10 hidden lg:block">
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-doctor-text mb-2">
            Registration Steps
          </h2>
          <p className="text-sm text-gray-600">
            Navigate freely between all steps
          </p>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;

            return (
              <div
                key={step.id}
                className={cn(
                  "flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200",
                  {
                    "bg-doctor-primary text-white shadow-md": isCurrent,
                    "bg-green-50 text-green-800 hover:bg-green-100":
                      isCompleted,
                    "bg-gray-50 text-gray-600 hover:bg-gray-100":
                      !isCurrent && !isCompleted,
                  },
                )}
                onClick={() => onStepClick(step.id)}
              >
                <div className="flex items-center w-full">
                  <div className="flex-shrink-0 mr-3">
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <Circle
                        className={cn("w-6 h-6", {
                          "text-white": isCurrent,
                          "text-gray-400": !isCurrent,
                        })}
                      />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          "text-xs font-medium uppercase tracking-wide",
                          {
                            "text-white/80": isCurrent,
                            "text-green-600": isCompleted,
                            "text-gray-500": !isCurrent && !isCompleted,
                          },
                        )}
                      >
                        Step {step.id}
                      </span>
                      {isCompleted && (
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                      )}
                    </div>
                    <p
                      className={cn("text-sm font-medium mt-1", {
                        "text-white": isCurrent,
                        "text-green-800": isCompleted,
                        "text-gray-700": !isCurrent && !isCompleted,
                      })}
                    >
                      {step.title}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Summary */}
        <div className="mt-8 p-4 bg-gradient-to-r from-doctor-primary/10 to-doctor-blue/10 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-doctor-text">
              {Math.round((currentStep / steps.length) * 100)}%
            </div>
            <div className="text-sm text-gray-600 mt-1">Current Progress</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepSidebar;
