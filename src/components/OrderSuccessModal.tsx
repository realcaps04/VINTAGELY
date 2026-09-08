import { AnimatePresence, motion } from 'motion/react'
import { useShop } from '../store/shop'
import { SuccessCheckIcon } from './Icons'

export function OrderSuccessModal() {
  const { isOrderSuccessOpen, acknowledgeOrderSuccess } = useShop()

  return (
    <AnimatePresence>
      {isOrderSuccessOpen && (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center bg-ink/45 px-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="order-success-title"
            aria-describedby="order-success-body"
            className="w-full max-w-[350px] rounded-[28px] bg-white px-7 pb-7 pt-8 text-center shadow-[0_24px_60px_-12px_rgba(0,0,0,0.35)]"
            initial={{ opacity: 0, y: 28, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          >
            <motion.span
              className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-ink text-white"
              initial={{ scale: 0.4, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 420, damping: 16, delay: 0.05 }}
            >
              <SuccessCheckIcon className="h-10 w-10" />
            </motion.span>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.28 }}
            >
              <h2
                id="order-success-title"
                className="mt-6 text-[24px] font-bold tracking-[-0.02em]"
              >
                Order Successful!
              </h2>
              <p
                id="order-success-body"
                className="mt-2.5 text-[14px] font-medium leading-relaxed text-subtle"
              >
                Your order has been placed. You can track it anytime from My Orders.
              </p>
            </motion.div>

            <motion.button
              type="button"
              onClick={acknowledgeOrderSuccess}
              className="mt-7 w-full rounded-full bg-ink py-4 text-[15px] font-bold text-white transition-opacity duration-200 active:opacity-80"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.25 }}
            >
              View Order
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
