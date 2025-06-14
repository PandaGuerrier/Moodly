"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, View } from "moti";
import tw from "twrnc";
import { Pressable, Text } from "react-native";
import { Button } from "~/components/ui/Button";

interface ModalContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export function Modal({ children }: { children: ReactNode }) {
  return <ModalProvider>{children}</ModalProvider>;
}

export const ModalTrigger = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { setOpen } = useModal();
  return <Button onPress={() => setOpen(true)}>{children}</Button>;
};

export const ModalBody = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { open } = useModal();

  /*useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);*/

  const modalRef = useRef(null);
  const { setOpen } = useModal();
  useOutsideClick(modalRef, () => setOpen(false));

  return (
    <AnimatePresence>
      {open && (
        <View
          from={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          style={tw`fixed [perspective:800px] [transform-style:preserve-3d] h-full w-full  flex items-center justify-center z-50`}
        >
          <Overlay />

          <View
            ref={modalRef}
            style={tw`absolute min-h-[80%] min-w-full bg-white dark:bg-neutral-950 border border-transparent dark:border-neutral-800 rounded-2xl z-50 overflow-hidden ${className ? className : " "}`}
            from={{
              opacity: 0,
              scale: 0.8,
              translateX: 10,
              rotation: 10,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              translateX: 0,
              rotation: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              translateX: 10,
              rotation: 10,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 15,
            }}
          >
            <CloseIcon />
            {children}
          </View>
        </View>
      )}
    </AnimatePresence>
  );
};

export const ModalContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <View
      style={tw`flex flex-col flex-1 p-8 md:p-10 ${className ? className : " "}`}
    >
      {children}
    </View>
  );
};

export const ModalFooter = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <View
      style={tw`flex justify-end p-4 bg-gray-100 dark:bg-neutral-900 ${className ? className : " "}`}
    >
      {children}
    </View>
  );
};

const Overlay = ({ className }: { className?: string }) => {
  return (
    <View
      from={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      style={tw`absolute bg-black bg-opacity-50 z-50 ${className ? className : " "}`}
    ></View>
  );
};

const CloseIcon = () => {
  const { setOpen } = useModal();
  return (
    <Pressable
      onPress={() => setOpen(false)}
      style={tw`absolute h-10 w-10 top-4 right-4 rounded-full bg-white dark:bg-neutral-950 border border-transparent dark:border-neutral-800 items-center justify-center z-50`}
    >
      <Text style={tw`text-black dark:text-white text-lg font-bold`}>X</Text>
    </Pressable>
  );
};

// Hook to detect clicks outside of a component.
// Add it in a separate file, I've added here for simplicity
export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement | null>,
  callback: Function,
) => {
  useEffect(() => {
    const listener = (event: any) => {
      // DO NOTHING if the element being clicked is the target element or their children
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      callback(event);
    };
    /*
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };*/
  }, [ref, callback]);
};
