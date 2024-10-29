"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Button from "../ui-components/Button";
import { cn } from "~/lib/utils";
import { FaStar } from "react-icons/fa";

// Zod schema to validate form input
const reviewSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  summary: z.string().min(5, "Summary should be at least 5 characters"),
  review: z.string().min(10, "Review must be at least 10 characters long"),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

export default function ReviewForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number | null>(null);

  const handleRating = (value: number) => {
    setRating(value);
    // onRatingChange(value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
  });

  const onSubmit = async (data: ReviewFormValues) => {
    setIsSubmitting(true);
    try {
      console.log("Submitted Review:", data);
      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-lg rounded-lg border bg-white p-6 shadow-md dark:bg-slate-800">
      <h2 className="text-2xl font-bold text-red-600">Submit a Review</h2>
      <p className="mt-2 text-gray-500">We value your feedback!</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        {/* Name Field */}
        <LabelInputContainer>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Enter your name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </LabelInputContainer>

        {/* Summary Field */}
        <div className="flex items-center gap-2">
          <Label>Rating</Label>
          <div className="flex space-x-1">
            {Array.from({ length: 5 }, (_, index) => {
              const starValue = index + 1;

              return (
                <FaStar
                  key={index}
                  className={`cursor-pointer text-3xl transition-colors ${
                    (hover || rating) >= starValue
                      ? "text-yellow-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => handleRating(starValue)}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(null)}
                />
              );
            })}
          </div>
        </div>
        {/* Review Field */}
        <LabelInputContainer>
          <Label htmlFor="review">Review</Label>
          <textarea
            id="review"
            className={cn(
              "dark:text-whitee w-full rounded-md bg-gray-50 px-3 py-2 text-black shadow-sm placeholder:text-neutral-400 focus:ring-2 focus:ring-red-500 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-red-400 dark:bg-slate-700 dark:placeholder:text-neutral-300 dark:focus-visible:ring-red-600",
              errors.review ? "border-red-500" : "border-gray-300",
            )}
            placeholder="Write your review here..."
            rows={5}
            {...register("review")}
          ></textarea>
          {errors.review && (
            <p className="text-sm text-red-500">{errors.review.message}</p>
          )}
        </LabelInputContainer>

        {/* Submit Button */}
        <Button
          title="Submit Review"
          type="submit"
          loading={isSubmitting}
          width="w-full"
          disabled={isSubmitting}
          className="bg-red-500 text-white hover:bg-red-600"
          onClick={() => {
            //
          }}
        />
      </form>
    </div>
  );
}

// LabelInputContainer Component
const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex flex-col space-y-2", className)}>{children}</div>
);
