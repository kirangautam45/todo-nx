import { motion, AnimatePresence } from 'framer-motion'
import useTodoAnimations from '../hooks/useTodoAnimations'

interface TodoItemProps {
  text: string
  isComplete: boolean
  toggleComplete: () => void
  removeTodo: () => void
}

const TodoItem = ({
  text,
  isComplete,
  toggleComplete,
  removeTodo,
}: TodoItemProps) => {
  const { controls, textControls, eraseOutAnimation } =
    useTodoAnimations(isComplete)

  const handleRemove = () => {
    textControls.start(eraseOutAnimation).then(() => {
      removeTodo()
    })
  }

  return (
    <AnimatePresence>
      <motion.section
        className='flex justify-between items-center p-4 border-t lg:w-1/2 w-full'
        initial={{ opacity: 1, scale: 1 }}
        animate={controls}
        exit={eraseOutAnimation}
      >
        <div className='flex mr-8 items-center' onClick={toggleComplete}>
          <label className='relative inline-flex items-center cursor-pointer'>
            <span className='size-6 mr-4 bg-transparent border-2 border-purple-600 rounded-full flex items-center justify-center'>
              <motion.span
                className='size-4 rounded-full bg-purple-600'
                initial={{ opacity: 0 }}
                animate={{ opacity: isComplete ? 1 : 0 }}
                transition={{ duration: 1 }}
              />
            </span>
          </label>

          <motion.div
            className='transition-opacity '
            initial={{ opacity: 1, scale: 1 }}
            animate={controls}
          >
            <motion.span
              animate={textControls}
              className={isComplete ? 'line-through' : ''}
            >
              {text}
            </motion.span>
          </motion.div>
        </div>
        <div className='flex items-center'>
          <button
            onClick={handleRemove}
            className='text-red-500 font-semibold text-[14px]'
          >
            Delete
          </button>
        </div>
      </motion.section>
    </AnimatePresence>
  )
}

export default TodoItem
