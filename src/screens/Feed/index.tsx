import React, { useEffect, useState } from "react";

import {
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { api } from "../../services/api";
import { useAuth } from "../../contexts/auth";
import { useIsFocused } from "@react-navigation/core";
import { format, parseISO } from "date-fns";

type TVaccine = {
  _id: string;
  description: string;
  vaccine: string;
};

type TCastration = {
  _id: string;
  description: string;
};

type TAnimalType = {
  _id: string;
  description: string;
};

type TAnimalHeight = {
  _id: string;
  description: string;
};

type TReactionn = {
  id: string;
  _id: string;
  person: string;
};

type TReaction = {
  _id: string;
  total: number;
  reactions: TReactionn[];
};

type TAnimal = {
  _id: string;
  name: string;
  history: string;
  years: number;
  vaccine: TVaccine[];
  observation: string;
  image: string;
  type: string;
  height: string;
  castration: string
};

type TPost = {
  _id: string;
  animal?: string;
  datePost?: string;
  name: string;
  createdAt: string;
  history: string;
  years: number;
  type: string;
  height: string;
  vaccines: string;
  castration: String;
  reaction: number;
  observation: string;
  liked: boolean;
  likeId?: string;
  image: string;
};

function Feed() {
  const [posts, setPosts] = useState<TPost[]>([]);
  const isFocused = useIsFocused();

  const { person } = useAuth();

  async function handleGetAnimalById(id: string): Promise<TAnimal | Error> {
    try {
      const response = await api.get(`animal/${id}`, {
        headers: {
          authorization: `Bearer ${person?.token}`,
        },
      });  

      return response.data;
    } catch (error) {
      return new Error(error as any);
    }
  }

  async function handleGetAnimalTypeById(
    id: string
  ): Promise<TAnimalType | Error> {
    try {
      const response = await api.get(`animalType/${id}`, {
        headers: {
          authorization: `Bearer ${person?.token}`,
        },
      });

      return response.data;
    } catch (error) {
      return new Error("error");
    }
  }

  async function handleGetAnimalHeightById(
    id: string
  ): Promise<TAnimalHeight | Error> {
    try {
      const response = await api.get(`animalHeight/${id}`, {
        headers: {
          authorization: `Bearer ${person?.token}`,
        },
      });

      return response.data;
    } catch (error) {
      return new Error("error");
    }
  }

  async function handleGetVaccineById(id: string): Promise<TVaccine | Error> {
    try {
      const response = await api.get(`animalVaccine/${id}`, {
        headers: {
          authorization: `Bearer ${person?.token}`,
        },
      });

      return response.data;
    } catch (error) {
      return new Error("error");
    }
  }

  async function handleGetReactionByPost(
    id: string
  ): Promise<TReaction | Error> {
    try {
      const response = await api.get(`/reaction/post/${id}`, {
        headers: {
          authorization: `Bearer ${person?.token}`,
        },
      });

      return response.data;
    } catch (error) {
      return new Error(error as any);
    }
  }

  async function handleGetCastrationById(
    id: string
  ): Promise<TCastration | Error> {
    try {
      const response = await api.get(`animalCastration/${id}`, {
        headers: {
          authorization: `Bearer ${person?.token}`,
        },
      });

      return response.data;
    } catch (error) {
      return new Error("error");
    }
  }

  async function handleGetAllPosts() {
    try {
      const response = await api.get("post", {
        headers: {
          authorization: `Bearer ${person?.token}`,
        },
      });

      await handleBuildPosts(response.data);
    } catch (error) {
      return new Error(error as any);
    }
  }

  async function handleBuildVaccines(
    vaccines: TVaccine[]
  ): Promise<string | Error> {
    const vaccinesNames: string[] = [];

    for await (const vaccine of vaccines) {
      let data = await handleGetVaccineById(vaccine.vaccine);
      if (data instanceof Error) return new Error();

      vaccinesNames.push(data.description);
    }

    return vaccinesNames.join(", ");
  }

  function handleCheckIfThePersonLiked(
    reaction: TReaction
  ): TReactionn | undefined {
    const found = reaction.reactions.find(
      (reaction) => reaction.person === person?.id
    );

    return found;
  }

  async function handleBuildPosts(posts: TPost[]): Promise<Error | undefined> {
    const postsSerialized: TPost[] = [];

    for await (const post of posts) {
      let animal = await handleGetAnimalById(String(post?.animal)); 
      console.log('animal',animal);
      

      if (animal instanceof Error) return new Error();

      let reaction = await handleGetReactionByPost(post?._id);
      let animalType = await handleGetAnimalTypeById(animal?.type);
      let animalHeight = await handleGetAnimalHeightById(animal?.height);
      let vaccines = await handleBuildVaccines(animal.vaccine);
      let castration = await handleGetCastrationById(animal?.castration);

      if (
        reaction instanceof Error ||
        animalType instanceof Error ||
        animalHeight instanceof Error ||
        vaccines instanceof Error ||
        castration instanceof Error
      )
        return new Error();

      const liked = handleCheckIfThePersonLiked(reaction);

      postsSerialized.push({
        _id: post._id,
        animal: animal._id,
        name: animal.name,
        createdAt: String(post.datePost),
        history: animal.history,
        years: animal.years,
        type: animalType.description,
        height: animalHeight.description,
        vaccines: vaccines,
        castration: castration.description,
        reaction: reaction.total,
        observation: animal.observation,
        liked: !!liked,
        likeId: liked?._id,
        image: animal.image,
      });
    }

    setPosts(postsSerialized);
  }

  async function handleLike(postId: string) {
    try {
      await api.post(
        "/reaction/like",
        {
          person: person?.id,
          post: postId,
        },
        {
          headers: {
            authorization: `Bearer ${person?.token}`,
          },
        }
      );

      handleGetAllPosts();
    } catch (error) {
      return new Error(error as any);
    }
  }

  async function handleDisLike(postId: string, likeId: string) {
    try {
      await api.post(
        "/reaction/deslike",
        {
          person: person?.id,
          post: postId,
          reaction: likeId,
        },
        {
          headers: {
            authorization: `Bearer ${person?.token}`,
          },
        }
      );

      handleGetAllPosts();
    } catch (error) {
      return new Error(error as any);
    }
  }

  useEffect(() => {
    handleGetAllPosts();
  }, [person, isFocused]);

  function handleNavigateToWhatsapp() {
    Linking.canOpenURL("whatsapp://send?text=oi").then((supported) => {
      if (supported) {
        return Linking.openURL(
          "whatsapp://send?phone=5555991004767&text=Olá, gostaria de falar sobre os animails disponíveis para lar temporário"
        );
      } else {
        return Linking.openURL(
          "https://api.whatsapp.com/send?phone=5555991004767&textOlá, gostaria de falar sobre os animails disponíveis para lar temporário"
        );
      }
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.posts}>
          {posts.map((post) => (
            <View key={post._id} style={styles.post}>
              <View style={styles.content}>
                <View style={styles.title}>
                  <Text style={styles.titleText}>{post.name}</Text>
                  <Text style={styles.dateText}>
                    {format(parseISO(post.createdAt), "dd/MM/yyyy")}
                  </Text>
                </View>
                <Text style={styles.defaultText}>História: {post.history}</Text>
                <Text style={styles.defaultText}>Idade: {post.years}</Text>
                <Text style={styles.defaultText}>Tipo: {post.type}</Text>
                <Text style={styles.defaultText}>Porte: {post.height}</Text>
                <Text style={styles.defaultText}>Vacinas: {post.vaccines}</Text>
                <Text style={styles.defaultText}>
                  Castração: {post.castration}
                </Text>
                <Text style={styles.defaultText}>
                  Observacão: {post.observation}
                </Text>

                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: post.image,
                    }}
                  />
                </View>

                <View style={styles.reaction}>
                  <Text style={styles.reactionText}>
                    Tenho interesse nesse animal:
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      post.liked
                        ? handleDisLike(post._id, String(post.likeId))
                        : handleLike(post._id)
                    }
                  >
                    <Ionicons name="md-heart" size={35} color="red" />
                  </TouchableOpacity>
                </View>

                {post.liked && (
                  <Text
                    style={styles.buttonWhatsapp}
                    onPress={handleNavigateToWhatsapp}
                  >
                    Conversar com a ONG
                  </Text>
                )}
              </View>

              <Text style={styles.qtdText}>
                Quantidade de curtidas: {post.reaction}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Feed;
