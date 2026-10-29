"use client";
import { cn } from "@/lib/utils";
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
}) => {
  // reducedMotion="user": com "reduzir movimento" ligado no sistema, o motion
  // desliga as animações de transform (tooltip) e mantém só opacidade
  return (
    <MotionConfig reducedMotion="user">
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </MotionConfig>
  );
};

// No celular os ícones ficam lado a lado, sempre à vista, na mesma barra do
// desktop sem a ampliação. O original abria uma coluna vertical por cima do
// texto a partir de um botão: um toque a mais e o texto escondido atrás.
const FloatingDockMobile = ({
  items,
  className,
}) => {
  return (
    <nav
      className={cn(
        "flex md:hidden items-center gap-1.5 rounded-2xl bg-carbon-raised/90 border border-ivory/10 px-2.5 py-2 shadow-xs",
        className
      )}
    >
      {items.map((item) => {
        const safeHref = item.href || '#';
        const isExternal = typeof safeHref === 'string' && safeHref.startsWith('http');
        return (
          <a
            key={item.title}
            href={safeHref}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            aria-label={item.title}
            title={item.title}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ivory/8 border border-ivory/10 text-ivory/80 hover:bg-ivory/15 hover:text-ivory transition-colors outline-none focus-visible:ring-2 focus-visible:ring-electric"
          >
            {item.icon}
          </a>
        );
      })}
    </nav>
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
