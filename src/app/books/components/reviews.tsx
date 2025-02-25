import { ReviewData } from "@/lib/review-data"
import { StarIcon } from "@heroicons/react/24/solid"
import DOMPurify from "isomorphic-dompurify"

export function Reviews({ reviewData }: { reviewData: ReviewData[] }) {
  return (
    <section className="grid grid-cols-1 gap-8 sm:grid-cols-2">
      {reviewData.map((review) => (
        <div key={review.name} className="flex flex-col gap-4">
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
    </section>
  )
}
