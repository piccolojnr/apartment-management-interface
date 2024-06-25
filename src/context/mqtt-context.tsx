import React, { createContext, useContext, useEffect, useState } from "react";
import mqtt from "mqtt";
import { set } from "lodash";

interface MqttContextProps {
  isConnected: boolean;
  message: { topic: string; message: string } | null;
  loading: boolean;
  subscribe: (topic: string) => void;
  publish: (topic: string, message: string) => void;
}

interface MqttProviderProps {
  brokerUrl: string;
  children: React.ReactNode;
}

const initialMqttContext = {
  isConnected: false,
  message: null,
  loading: false,
  subscribe: () => {},
  publish: () => {},
};
const MqttContext = createContext<MqttContextProps>(initialMqttContext);

export const MqttProvider = ({ brokerUrl, children }: MqttProviderProps) => {
  const [client, setClient] = useState<mqtt.MqttClient | null | undefined>(
    null
  );
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    topic: string;
    message: string;
  } | null>(null);

  // useEffect(() => {
  //   setLoading(true);
  //   const mqttClient = mqtt.connect(brokerUrl);
  //   setClient(mqttClient);

  //   mqttClient.on("connect", () => {
  //     setIsConnected(true);
  //     setLoading(false);
  //   });

  //   mqttClient.on("message", (topic, message) => {
  //     setMessage({ topic, message: message.toString() });
  //   });

  //   mqttClient.on("error", (error) => {
  //     console.error(error);
  //     setLoading(false);
  //   });

  //   return () => {
  //     mqttClient.end();
  //   };
  // }, [brokerUrl]);

  const subscribe = (topic: string) => {
    if (client) {
      client.subscribe(topic);
    }
  };

  const publish = (topic: string, message: string) => {
    if (client) {
      client.publish(topic, message);
    }
  };

  return (
    <MqttContext.Provider
      value={{ isConnected, message, subscribe, publish, loading }}
    >
      {children}
    </MqttContext.Provider>
  );
};

export const useMqtt = () => useContext(MqttContext);
