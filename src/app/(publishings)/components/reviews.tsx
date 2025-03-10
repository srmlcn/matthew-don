import { AnimatedSection } from "@/app/components/animated-section"
import { ReviewData } from "@/lib/review-data"
import { StarIcon } from "@heroicons/react/24/solid"
import DOMPurify from "isomorphic-dompurify"

export function Reviews({ reviewData }: { reviewData: ReviewData[] }) {
  return (
    <>
      {reviewData.length === 0 && <NoReviews />}
      {reviewData.length > 0 && (
        <AnimatedSection className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {reviewData.map((review, index) => (
            <div
              key={`${review.name}-${index}`}
              className="flex flex-col gap-4"
            >
              <p className="text-center">{review.review}</p>

              <div>
                <p className="font-bold text-xl text-center">{review.name}</p>
                <p className="text-center">
                  {DOMPurify.sanitize(review.description)}
                </p>
              </div>

              <div className="flex justify-center gap-2">
                {Array.from({ length: review.stars }).map((_, index) => (
                  <StarIcon key={index} className="h-6 w-6 text-yellow-500" />
                ))}
              </div>
            </div>
          ))}
        </AnimatedSection>
      )}
    </>
  )
}

function NoReviews() {
  return (
    <AnimatedSection className="max-w-[64rem] w-full min-h-[12rem] rounded-3xl flex flex-col items-center justify-center bg-zinc-300/20 text-center">
      <div className="flex justify-center pb-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <StarIcon key={index} className="h-6 w-6 text-yellow-500" />
        ))}
      </div>
      <p className="text-center">No reviews yet.</p>
      <p className="text-center">Check back soon!</p>
    </AnimatedSection>
  )
}
