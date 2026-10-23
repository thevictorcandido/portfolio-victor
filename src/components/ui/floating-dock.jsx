"use client";
import { cn } from "@/lib/utils";
import { LayoutGrid } from "lucide-react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
  toggleLabel = "Abrir menu de links",
}) => {
  // reducedMotion="user": com "reduzir movimento" ligado no sistema, o motion
  // desliga as animações de transform (tooltip, menu mobile) e mantém só opacidade
  return (
    <MotionConfig reducedMotion="user">
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} toggleLabel={toggleLabel} />
    </MotionConfig>
  );
};

const FloatingDockMobile = ({
  items,
  className,
  toggleLabel,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2 items-center"
          >
            {items.map((item, idx) => {
              const safeHref = item.href || '#';
              const isExternal = typeof safeHref === 'string' && safeHref.startsWith('http');
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    transition: {
                      delay: idx * 0.05,
                    },
                  }}
                  transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                >
                  <a
                    href={safeHref}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-carbon-raised border border-ivory/10 shadow-xs text-ivory/80 hover:text-ivory"
                  >
                    <div className="h-4 w-4 flex items-center justify-center">{item.icon}</div>
                  </a>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-carbon-raised border border-ivory/10 shadow-xs text-ivory/70 hover:text-ivory"
        aria-label={toggleLabel}
      >
        <LayoutGrid className="h-5 w-5" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-16 items-end gap-3 rounded-2xl bg-carbon-raised/90 border border-ivory/10 px-4 pb-3 md:flex shadow-xs backdrop-blur-md",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}) {
  let ref = useRef(null);
  // A ampliação segue o mouse via springs, fora do alcance do MotionConfig: sem movimento, tamanho fixo
  const reduceMotion = useReducedMotion();

  let distance = useTransform(mouseX, (val) => {
    if (reduceMotion) return Infinity;
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [42, 68, 42]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [42, 68, 42]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 34, 20]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 34, 20]
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);
  const safeHref = href || '#';
  const isExternal = typeof safeHref === 'string' && safeHref.startsWith('http');

  return (
    <a
      href={safeHref}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full bg-ivory/8 hover:bg-ivory/15 border border-ivory/10 shadow-2xs transition-colors"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-9 left-1/2 w-fit rounded-md border border-ivory bg-ivory px-2.5 py-1 text-xs whitespace-pre text-carbon shadow-md font-medium"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center text-ivory/80"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}

export default FloatingDock;
